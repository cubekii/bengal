#!/bin/bash
cd "$(dirname "$0")"

test=1
set -o pipefail

for i in $(ls example); do
  target/release/bengal example/$i > /dev/null || { test=0; echo -e "\e[31m$i finished with error\e[0m"; }
done

if [ $test == 0 ]; then
  exit
fi