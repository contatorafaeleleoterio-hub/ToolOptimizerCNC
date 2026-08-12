#!/usr/bin/env python3
"""
CNC Parameters Validator
Valida parâmetros de usinagem contra normas e limites de segurança

Autor: Rafael Mestre
Data: 09/01/2025
Fontes: Sandvik, Kennametal, ISO 3685, Machinery's Handbook
"""

import math
from typing import Dict, List, Tuple
from enum import Enum


class AlertLevel(Enum):
    """Níveis de alerta para validação"""
    CRITICAL = "CRÍTICO"  # Bloquear operação
    WARNING = "ALERTA"    # Avisar usuário
    INFO = "SUGESTÃO"     # Otimização


class MachineType(Enum):
    """Tipos de máquina CNC"""
    CONVENTIONAL = "convencional"
    HSM = "hsm"
    LATHE = "torno"


class Material(Enum):
    """Materiais de usinagem comuns"""
    STEEL_MILD = "aço_carbono"
    STAINLESS = "inox"
    ALUMINUM = "aluminio"
    TITANIUM = "titanio"
    CAST_IRON = "ferro_fundido"


class ValidationResult:
    """Resultado de validação de parâmetros"""
    
    def __init__(self):
        self.valid = True
        self.alerts: List[Dict] = []
    
    def add_alert(self, level: AlertLevel, message: str, parameter: str = ""):
        """Adiciona alerta ao resultado"""
        self.alerts.append({
            "level": level.value,
            "message": message,
            "parameter": parameter
        })
        if level == AlertLevel.CRITICAL:
            self.valid = False
    
    def get_summary(self) -> Dict:
        """Retorna sumário da validação"""
        return {
            "valid": self.valid,
            "critical_count": sum(1 for a in self.alerts if a["level"] == AlertLevel.CRITICAL.value),
            "warning_count": sum(1 for a in self.alerts if a["level"] == AlertLevel.WARNING.value),
            "info_count": sum(1 for a in self.alerts if a["level"] == AlertLevel.INFO.value),
            "alerts": self.alerts
        }


class CNCValidator:
    """Validador de parâmetros CNC"""
    
    # Limites de segurança por tipo de máquina (Fonte: Haas, DMG MORI, Mazak)
    MACHINE_LIMITS = {
        MachineType.CONVENTIONAL: {
            "rpm_min": 100,
            "rpm_max": 12000,
            "rpm_warning": 8000,
            "power_kw_typical": 15,
            "feed_max_safe": 5000,  # mm/min
            "feed_hsm_threshold": 10000
        },
        MachineType.HSM: {
            "rpm_min": 1000,
            "rpm_max": 40000,
            "rpm_warning": 35000,
            "power_kw_typical": 30,
            "feed_max_safe": 20000,
            "feed_hsm_threshold": 30000
        },
        MachineType.LATHE: {
            "rpm_min": 50,
            "rpm_max": 6000,
            "rpm_warning": 5000,
            "power_kw_typical": 20,
            "feed_max_safe": 1000,
            "feed_hsm_threshold": 2000
        }
    }
    
    # Limites de velocidade de corte por material (m/min)
    # Fonte: Sandvik Coromant Handbook 2023, Kennametal Master Catalog 2024
    MATERIAL_VC_LIMITS = {
        Material.STEEL_MILD: {
            "vc_min": 50,
            "vc_max": 250,
            "vc_roughing": (80, 150),
            "vc_finishing": (120, 200)
        },
        Material.STAINLESS: {
            "vc_min": 40,
            "vc_max": 180,
            "vc_roughing": (50, 100),
            "vc_finishing": (80, 150)
        },
        Material.ALUMINUM: {
            "vc_min": 200,
            "vc_max": 1500,
            "vc_roughing": (300, 600),
            "vc_finishing": (500, 1200)
        },
        Material.TITANIUM: {
            "vc_min": 30,
            "vc_max": 120,  # Crítico: >120 pode causar fogo
            "vc_roughing": (40, 70),
            "vc_finishing": (60, 100)
        },
        Material.CAST_IRON: {
            "vc_min": 80,
            "vc_max": 300,
            "vc_roughing": (100, 180),
            "vc_finishing": (150, 250)
        }
    }
    
    # Limites de avanço por dente (mm/dente)
    # Fonte: Kennametal Milling Guide 2024, Iscar Tool Advisor 2024
    MATERIAL_FZ_LIMITS = {
        Material.STEEL_MILD: {
            "fz_min": 0.03,
            "fz_max": 0.35,
            "fz_roughing": (0.10, 0.25),
            "fz_finishing": (0.05, 0.10)
        },
        Material.STAINLESS: {
            "fz_min": 0.03,  # Abaixo: risco de encruamento
            "fz_max": 0.30,
            "fz_roughing": (0.08, 0.20),
            "fz_finishing": (0.04, 0.08)
        },
        Material.ALUMINUM: {
            "fz_min": 0.05,
            "fz_max": 0.50,
            "fz_roughing": (0.15, 0.35),
            "fz_finishing": (0.08, 0.15)
        },
        Material.TITANIUM: {
            "fz_min": 0.02,  # Crítico: abaixo causa desgaste
            "fz_max": 0.20,
            "fz_roughing": (0.05, 0.15),
            "fz_finishing": (0.03, 0.06)
        },
        Material.CAST_IRON: {
            "fz_min": 0.04,
            "fz_max": 0.35,
            "fz_roughing": (0.12, 0.28),
            "fz_finishing": (0.06, 0.12)
        }
    }
    
    def __init__(self, machine_type: MachineType = MachineType.CONVENTIONAL):
        self.machine_type = machine_type
        self.machine_limits = self.MACHINE_LIMITS[machine_type]
    
    def validate_rpm(self, rpm: float, diameter_mm: float) -> ValidationResult:
        """
        Valida RPM considerando limites da máquina
        
        Fórmula base: n = (Vc × 1000) / (π × D)
        Fonte: Machining Data Handbook 28th Ed, Section 10
        """
        result = ValidationResult()
        
        # Validação básica
        if rpm <= 0:
            result.add_alert(AlertLevel.CRITICAL, 
                           "RPM deve ser positivo", "rpm")
            return result
        
        # Limites absolutos
        if rpm < self.machine_limits["rpm_min"]:
            result.add_alert(AlertLevel.CRITICAL,
                           f"RPM abaixo do mínimo da máquina ({self.machine_limits['rpm_min']} RPM)",
                           "rpm")
        
        if rpm > self.machine_limits["rpm_max"]:
            result.add_alert(AlertLevel.CRITICAL,
                           f"RPM acima do máximo da máquina ({self.machine_limits['rpm_max']} RPM)",
                           "rpm")
        
        # Limite de advertência
        if rpm > self.machine_limits["rpm_warning"]:
            result.add_alert(AlertLevel.WARNING,
                           f"RPM alto ({rpm:.0f}) - verificar se spindle suporta",
                           "rpm")
        
        # Validação específica para tornos (força centrífuga)
        # Fonte: ISO 13041-1, Mazak Technical Manual
        if self.machine_type == MachineType.LATHE and diameter_mm > 0:
            rpm_max_centrifugal = 30000 / math.sqrt(diameter_mm)
            if rpm > rpm_max_centrifugal:
                result.add_alert(AlertLevel.CRITICAL,
                               f"RPM excede limite de força centrífuga para D={diameter_mm}mm " +
                               f"(máx {rpm_max_centrifugal:.0f} RPM)",
                               "rpm")
        
        # RPM muito baixo para ferramenta pequena
        if diameter_mm > 0 and diameter_mm < 10 and rpm < 500:
            result.add_alert(AlertLevel.INFO,
                           "RPM baixo para ferramenta pequena - verificar Vc",
                           "rpm")
        
        return result
    
    def validate_cutting_speed(self, vc: float, material: Material, 
                               operation: str = "roughing") -> ValidationResult:
        """
        Valida velocidade de corte para material específico
        
        Fontes: Sandvik 2023, Kennametal 2024, Mitsubishi 2023
        """
        result = ValidationResult()
        
        if vc <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Velocidade de corte deve ser positiva", "vc")
            return result
        
        limits = self.MATERIAL_VC_LIMITS.get(material)
        if not limits:
            result.add_alert(AlertLevel.WARNING,
                           "Material não reconhecido - validação limitada", "material")
            return result
        
        # Limites absolutos
        if vc < limits["vc_min"]:
            result.add_alert(AlertLevel.WARNING,
                           f"Vc muito baixo ({vc:.0f} m/min) para {material.value}",
                           "vc")
        
        if vc > limits["vc_max"]:
            result.add_alert(AlertLevel.CRITICAL,
                           f"Vc muito alto ({vc:.0f} m/min) para {material.value} " +
                           f"(máx seguro: {limits['vc_max']} m/min)",
                           "vc")
        
        # Validação por operação
        vc_range = limits.get(f"vc_{operation}", None)
        if vc_range:
            vc_min_op, vc_max_op = vc_range
            if vc < vc_min_op:
                result.add_alert(AlertLevel.INFO,
                               f"Vc conservador para {operation} - " +
                               f"range típico: {vc_min_op}-{vc_max_op} m/min",
                               "vc")
            elif vc > vc_max_op:
                result.add_alert(AlertLevel.WARNING,
                               f"Vc alto para {operation} - " +
                               f"range típico: {vc_min_op}-{vc_max_op} m/min",
                               "vc")
        
        # Alerta especial para titânio (risco de fogo)
        # Fonte: OSHA Titanium Safety Guidelines
        if material == Material.TITANIUM and vc > 100:
            result.add_alert(AlertLevel.WARNING,
                           "ATENÇÃO: Vc alto em titânio - risco de reação química/fogo. " +
                           "Refrigeração abundante obrigatória (>20 L/min)",
                           "vc")
        
        return result
    
    def validate_feed_per_tooth(self, fz: float, material: Material,
                                operation: str = "roughing") -> ValidationResult:
        """
        Valida avanço por dente
        
        Fontes: Kennametal 2024, Iscar 2024, Walter Tools 2023
        """
        result = ValidationResult()
        
        if fz <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Avanço por dente deve ser positivo", "fz")
            return result
        
        limits = self.MATERIAL_FZ_LIMITS.get(material)
        if not limits:
            result.add_alert(AlertLevel.WARNING,
                           "Material não reconhecido - validação limitada", "material")
            return result
        
        # Limites críticos
        if fz < limits["fz_min"]:
            msg = f"fz muito baixo ({fz:.3f} mm) - risco de desgaste por atrito"
            if material == Material.STAINLESS:
                msg += " e encruamento (crítico em inox)"
            result.add_alert(AlertLevel.CRITICAL, msg, "fz")
        
        if fz > limits["fz_max"]:
            result.add_alert(AlertLevel.CRITICAL,
                           f"fz muito alto ({fz:.3f} mm) - risco de quebra de ferramenta " +
                           f"(máx seguro: {limits['fz_max']} mm)",
                           "fz")
        
        # Validação por operação
        fz_range = limits.get(f"fz_{operation}", None)
        if fz_range:
            fz_min_op, fz_max_op = fz_range
            if fz < fz_min_op or fz > fz_max_op:
                result.add_alert(AlertLevel.INFO,
                               f"fz fora do range típico para {operation}: " +
                               f"{fz_min_op}-{fz_max_op} mm/dente",
                               "fz")
        
        return result
    
    def validate_depth_of_cut(self, ap: float, ae: float, 
                             diameter_mm: float) -> ValidationResult:
        """
        Valida profundidades axial e radial
        
        Fontes: Machinery's Handbook 31st Ed, Kennametal Milling Guide 2024
        """
        result = ValidationResult()
        
        if ap <= 0 or ae <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Profundidades devem ser positivas", "ap/ae")
            return result
        
        if diameter_mm <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Diâmetro deve ser positivo", "diameter")
            return result
        
        # Validação profundidade axial (ap)
        ap_ratio = ap / diameter_mm
        
        if ap_ratio > 1.5:
            result.add_alert(AlertLevel.CRITICAL,
                           f"ap muito alto ({ap:.2f}mm = {ap_ratio:.1f}×D) - " +
                           "risco de deflexão/vibração/quebra",
                           "ap")
        elif ap_ratio > 1.0:
            result.add_alert(AlertLevel.WARNING,
                           f"ap alto ({ap:.2f}mm = {ap_ratio:.1f}×D) - " +
                           "verificar rigidez do setup",
                           "ap")
        
        if ap_ratio < 0.05:
            result.add_alert(AlertLevel.WARNING,
                           f"ap muito baixo ({ap:.2f}mm) - pode causar desgaste por atrito",
                           "ap")
        
        # Validação profundidade radial (ae)
        ae_ratio = ae / diameter_mm
        
        if ae_ratio > 0.8:
            result.add_alert(AlertLevel.WARNING,
                           f"ae muito alto ({ae:.2f}mm = {ae_ratio:.1f}×D) - " +
                           "considere reduzir fz em 20%",
                           "ae")
        
        # Sugestão de ajuste de fz baseado em ae
        # Fonte: Walter Tools Technical Guide 2023
        if ae_ratio < 0.3:
            result.add_alert(AlertLevel.INFO,
                           f"ae baixo ({ae_ratio:.1f}×D) - pode aumentar fz em até 30%",
                           "ae")
        
        return result
    
    def validate_power(self, power_kw: float, force_n: float = None) -> ValidationResult:
        """
        Valida potência calculada
        
        Fórmula: Pc = (Fc × Vc) / 60000
        Fonte: ASM Handbook Vol.16, p.234
        """
        result = ValidationResult()
        
        if power_kw <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Potência deve ser positiva", "power")
            return result
        
        machine_power = self.machine_limits["power_kw_typical"]
        power_ratio = power_kw / machine_power
        
        # Limite crítico (considerar eficiência de 85%)
        # Fonte: ISO 14649-11
        if power_ratio > 0.95:
            result.add_alert(AlertLevel.CRITICAL,
                           f"Potência calculada ({power_kw:.1f} kW) excede " +
                           f"95% da nominal ({machine_power} kW) - risco de sobrecarga",
                           "power")
        elif power_ratio > 0.80:
            result.add_alert(AlertLevel.WARNING,
                           f"Potência calculada ({power_kw:.1f} kW) próxima ao limite " +
                           f"({power_ratio*100:.0f}% de {machine_power} kW) - monitorar temperatura",
                           "power")
        
        # Potência muito baixa para desbaste pode indicar erro
        if power_kw < 0.5 and force_n and force_n > 500:
            result.add_alert(AlertLevel.INFO,
                           f"Potência baixa ({power_kw:.1f} kW) com força alta ({force_n:.0f} N) - " +
                           "revisar cálculo",
                           "power")
        
        return result
    
    def validate_feed_rate(self, vf: float) -> ValidationResult:
        """
        Valida avanço por minuto
        
        Fórmula: Vf = fz × Z × n
        Fonte: Kennametal Milling Catalog 2024
        """
        result = ValidationResult()
        
        if vf <= 0:
            result.add_alert(AlertLevel.CRITICAL,
                           "Avanço deve ser positivo", "vf")
            return result
        
        # Limites por tipo de máquina
        if vf > self.machine_limits["feed_max_safe"]:
            if self.machine_type == MachineType.CONVENTIONAL:
                result.add_alert(AlertLevel.CRITICAL,
                               f"Avanço muito alto ({vf:.0f} mm/min) para máquina convencional " +
                               f"(típico: < {self.machine_limits['feed_max_safe']} mm/min)",
                               "vf")
            else:
                result.add_alert(AlertLevel.WARNING,
                               f"Avanço muito alto ({vf:.0f} mm/min) - verificar aceleração",
                               "vf")
        
        if vf > self.machine_limits["feed_hsm_threshold"]:
            result.add_alert(AlertLevel.CRITICAL,
                           f"Avanço extremo ({vf:.0f} mm/min) - excede capacidade",
                           "vf")
        
        if vf < 10:
            result.add_alert(AlertLevel.WARNING,
                           f"Avanço muito baixo ({vf:.0f} mm/min) - tempo de ciclo alto",
                           "vf")
        
        return result
    
    def validate_complete_operation(self, params: Dict) -> ValidationResult:
        """
        Valida conjunto completo de parâmetros com validação cruzada
        
        Params esperados:
        - rpm, vc, fz, vf, ap, ae, diameter_mm
        - material (Material enum)
        - operation ("roughing" ou "finishing")
        - power_kw (opcional)
        - force_n (opcional)
        """
        result = ValidationResult()
        
        # Validações individuais
        rpm = params.get("rpm", 0)
        diameter = params.get("diameter_mm", 0)
        if rpm and diameter:
            rpm_result = self.validate_rpm(rpm, diameter)
            result.alerts.extend(rpm_result.alerts)
            result.valid = result.valid and rpm_result.valid
        
        vc = params.get("vc", 0)
        material = params.get("material")
        operation = params.get("operation", "roughing")
        if vc and material:
            vc_result = self.validate_cutting_speed(vc, material, operation)
            result.alerts.extend(vc_result.alerts)
            result.valid = result.valid and vc_result.valid
        
        fz = params.get("fz", 0)
        if fz and material:
            fz_result = self.validate_feed_per_tooth(fz, material, operation)
            result.alerts.extend(fz_result.alerts)
            result.valid = result.valid and fz_result.valid
        
        ap = params.get("ap", 0)
        ae = params.get("ae", 0)
        if ap and ae and diameter:
            depth_result = self.validate_depth_of_cut(ap, ae, diameter)
            result.alerts.extend(depth_result.alerts)
            result.valid = result.valid and depth_result.valid
        
        power = params.get("power_kw", 0)
        force = params.get("force_n", 0)
        if power:
            power_result = self.validate_power(power, force)
            result.alerts.extend(power_result.alerts)
            result.valid = result.valid and power_result.valid
        
        vf = params.get("vf", 0)
        if vf:
            vf_result = self.validate_feed_rate(vf)
            result.alerts.extend(vf_result.alerts)
            result.valid = result.valid and vf_result.valid
        
        # Validações cruzadas (sanity checks)
        if power and power < 0.5 and (ap > 5 or ae > 5):
            result.add_alert(AlertLevel.WARNING,
                           "Potência baixa com profundidades altas - revisar cálculo",
                           "power/depth")
        
        if rpm and rpm < 300 and diameter and diameter < 10:
            result.add_alert(AlertLevel.INFO,
                           "RPM baixo para ferramenta pequena - verificar Vc",
                           "rpm/diameter")
        
        if vf and vf > 5000 and self.machine_type == MachineType.CONVENTIONAL:
            result.add_alert(AlertLevel.WARNING,
                           "Avanço alto para máquina convencional",
                           "vf/machine")
        
        return result


def example_usage():
    """Exemplo de uso do validador"""
    
    # Criar validador para máquina convencional
    validator = CNCValidator(MachineType.CONVENTIONAL)
    
    # Exemplo 1: Validar RPM
    print("=== Exemplo 1: Validar RPM ===")
    result = validator.validate_rpm(rpm=8500, diameter_mm=12)
    print(result.get_summary())
    print()
    
    # Exemplo 2: Validar operação completa
    print("=== Exemplo 2: Operação Completa ===")
    params = {
        "rpm": 3000,
        "vc": 120,
        "fz": 0.15,
        "vf": 1800,
        "ap": 8,
        "ae": 6,
        "diameter_mm": 12,
        "material": Material.STEEL_MILD,
        "operation": "roughing",
        "power_kw": 4.5
    }
    result = validator.validate_complete_operation(params)
    summary = result.get_summary()
    
    print(f"Válido: {summary['valid']}")
    print(f"Alertas Críticos: {summary['critical_count']}")
    print(f"Avisos: {summary['warning_count']}")
    print(f"Sugestões: {summary['info_count']}")
    print("\nDetalhes:")
    for alert in summary['alerts']:
        print(f"[{alert['level']}] {alert['parameter']}: {alert['message']}")


if __name__ == "__main__":
    example_usage()
