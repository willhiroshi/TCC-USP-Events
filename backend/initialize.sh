# install python3.10 to default folder
apt install software-properties-common -y
add-apt-repository -y ppa:deadsnakes/ppa
apt install -y python3.10
apt-get install -y pip

# install lib dependencies
python3.10 -m pip install -U -r requirements.txt
export PYTHONPATH="${PYTHONPATH}:$PWD"
