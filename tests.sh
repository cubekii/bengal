#!/bin/bash
cd "$(dirname "$0")"

test=1

for i in $(ls example); do
  target/release/bengal example/$i > /dev/null || (echo -e "\e[31m$i finished with error \e[0m" && test=0)
done

if [ $test == 0 ]; then
  exit 1
fi