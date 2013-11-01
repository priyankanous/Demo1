#ifndef _IO_UTILITIES_H_
#define _IO_UTILITIES_H_

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <map>
#include <utility>
#include <algorithm>
#include <stack>
#include <bitset>
#include <cmath>

#include "FSMDataStructures.h"
#include "StateEncoder.h"

int readFSM(std::vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]);

void printFSM(FSM_struct & FSM, std::ostream & outfile, bool verbose);

std::string GetNameFromPath (const std::string& str);

void WriteStateToFile( unsigned int currentState, std::vector<std::pair<unsigned int, std::string> > & nextStates, bool marked, std::ofstream & outfile, StateEncoder & encoder, std::pair<std::string, std::string>);

void InvertTransitions(std::vector<FSM_struct>& FSMArr, std::vector<FSM_struct>& FSMArr_inv);

#endif
