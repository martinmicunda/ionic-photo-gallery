#!/bin/bash

set -e
ansible-galaxy remove martinmicunda.common \
                      martinmicunda.nodejs \
                      martinmicunda.ionic \
                      laggyluke.direnv \
                      Stouts.mongodb \
                      DavidWittman.redis \
                      williamyeh.oracle-java \
                      nickpack.android_sdk
