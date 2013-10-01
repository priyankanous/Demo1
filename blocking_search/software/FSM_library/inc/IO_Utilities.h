#ifndef _UTILITIES_H_
#define _UTILITIES_H_

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

#include <FSMDataStructures.h>
#include <Event_wrapper.h>

void GenerateOptimalSubgroups(std::vector<FSM_struct> & FSMArr);

int readFSM(std::vector<FSM_struct>& FSMArr, bool print, int argc, char* argv[]);

void printFSM(FSM_struct & FSM, std::string filepath);

std::string GetNameFromPath (const std::string& str);

void printState(FSM_struct & FSM, State & state, std::ofstream & outfile);

#endif
