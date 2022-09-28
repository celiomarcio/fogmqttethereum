#!/bin/bash

truffle compile && truffle migrate --reset && cp build/contracts/ConceptProof.json ../utils/ConceptProof.json 