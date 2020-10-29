echo "RUNNING TESTS";
nvm use stable
npm install localtunnel
lt -p 3000 > url.txt &
TEST_URL=`cat url.txt | sed -r 's/your url is: (.*)/\1/'`
testery create-test-run --api-url https://api.testery.io/api --token "$TESTERY_TOKEN" --include-tags "smoke" \
              --variable "TEST_URL=${TEST_URL}" \
              --git-ref "$GITHUB_SHA" --project "example-webdriverio" --environment "testery-dev" \
              --wait-for-results

