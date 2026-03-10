#!/bin/bash
cd "$(dirname "$0")"

for i in $(ls example); do
  target/release/bengal example/$i > /dev/null || echo -e "\e[31m$i finished with error \e[0m"
done