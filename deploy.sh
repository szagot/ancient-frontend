if [ -z "$1" ]; then
  echo "Por favor, forneça o caminho da chave de acesso."
  exit 1
fi

KEY_PATH=$1

echo 'Dando stash de qualquer alteração pendente de commit...'
echo ''
git stash

echo '------'
echo 'Compilando...'
echo ''
rm -rf dist
npm run build:prod

echo '------'
echo 'Apagando arquivos antigos em 52.206.107.239:/var/www/html/ancient/frontend/'
echo ''
ssh -i "$KEY_PATH" ec2-user@52.206.107.239 'rm -rf /var/www/html/ancient/frontend/*'

echo '------'
echo 'Efetuando deploy'
echo ''
scp -ri "$KEY_PATH" ./dist/ancient-frontend/browser/* ec2-user@52.206.107.239:/var/www/html/ancient/frontend/

echo 'Retornando projeto salvo'
echo ''
git stash pop
echo ''
