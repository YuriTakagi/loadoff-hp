# 開発サーバー立ち上げ
dev:
	bunx --bun astro dev
# ビルド
build:
	bunx --bun astro build
# プレビュー
preview:
	bunx --bun astro preview
# フォーマット
format:
	bunx @biomejs/biome format --write ./src
# リント
lint:
	bunx @biomejs/biome lint  --write ./src
