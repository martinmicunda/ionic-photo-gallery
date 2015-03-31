#!/bin/bash

set -e
ansible-galaxy remove martinmicunda.common \
                      martinmicunda.nodejs \
                      laggyluke.direnv \
                      Stouts.mongodb \
                      DavidWittman.redis \
                      williamyeh.oracle-java \
                      nickp666.android-sdk
