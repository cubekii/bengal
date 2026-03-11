#!/bin/bash
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO_ID="${ID}"
    DISTRO_LIKE="${ID_LIKE:-}"
fi

REPO="cubekii/bengal"
LATEST=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
    | grep '"tag_name"' \
    | sed 's/.*"tag_name": *"\(.*\)".*/\1/')

ARCH=$(uname -m)

case "$ARCH" in
    x86_64)  ARCH="amd64" ;;
    aarch64) ARCH="arm64" ;;
esac

if echo "$DISTRO_ID $DISTRO_LIKE" | grep -qiE "debian|ubuntu"; then
    echo "Debian-based"
    curl -sL "https://github.com/${REPO}/releases/download/bengal_${LATEST}_${ARCH}_.deb"
    exec sudo apt-get install -y /tmp/bengal_${LATEST}_${ARCH}.deb
    exit 0
elif echo "$DISTRO_ID $DISTRO_LIKE" | grep -qiE "fedora|rhel|centos|suse"; then
    echo "RPM-based (Fedora/RHEL)"
    #dnf install -y package
    exit 0
elif echo "$DISTRO_ID $DISTRO_LIKE" | grep -qiE "arch|manjaro|endeavour"; then
    echo "Arch-based"
    pacman -S --noconfirm package
    exit 0
else
    echo "Unsupported distro: $DISTRO_ID" >&2
    exit 1
fi