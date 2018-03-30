rm -rf ./dist/*
mkdir ./dist/js
mkdir ./dist/css
mkdir ./dist/img

echo "## Starting..."

echo "Copy images..."
cp -r ./src/img/ ./dist/img/

echo "Running SLIM..."
slimrb ./src/index.html.slim > ./dist/index.html

echo "Running SASS..."
sass ./src/css/index.scss ./dist/css/index.css
sass ./src/css/normalize.scss ./dist/css/normalize.css

echo "Running Babel..."
babel --out-dir=./dist/_tmp/js/lib ./src/js/lib
babel -o ./dist/_tmp/js/app.js ./src/js/app.js

echo "Running Browserify..."
browserify ./dist/_tmp/js/app.js -o ./dist/js/bundle.js

osascript -e 'display notification "All done" with title "My build"'

echo "## Done!"
echo ""
