#!/bin/bash

TARGET_DIR="C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\DOCS_TREINAMENTO_RAG"

# Copiar todos os arquivos de specs
find docs/specs -type f \( -name "*.md" -o -name "*.json" \) -exec bash -c 'mkdir -p "$TARGET_DIR/$(dirname "{}")" && cp "{}" "$TARGET_DIR/{}" && echo "✓ {}"' \;

# Copiar todos os arquivos de technical
find docs/technical -type f -name "*.md" -exec bash -c 'mkdir -p "$TARGET_DIR/$(dirname "{}")" && cp "{}" "$TARGET_DIR/{}" && echo "✓ {}"' \;

# Copiar todos os arquivos de design
find docs/design -type f -name "*.md" -exec bash -c 'mkdir -p "$TARGET_DIR/$(dirname "{}")" && cp "{}" "$TARGET_DIR/{}" && echo "✓ {}"' \;

# Copiar README e outros .md na raiz de docs
find docs -maxdepth 1 -name "*.md" -exec bash -c 'mkdir -p "$TARGET_DIR/$(dirname "{}")" && cp "{}" "$TARGET_DIR/{}" && echo "✓ {}"' \;

# Copiar .claude files
find .claude -type f -name "*.md" -exec bash -c 'mkdir -p "$TARGET_DIR/$(dirname "{}")" && cp "{}" "$TARGET_DIR/{}" && echo "✓ {}"' \;

