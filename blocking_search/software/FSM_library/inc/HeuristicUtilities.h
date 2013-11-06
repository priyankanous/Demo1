#ifndef _HEURISTIC_UTILITIES_H_
#define _HEURISTIC_UTILITIES_H_

#include <iostream>
#include <string>
#include <algorithm>


#include "FSMDataStructures.h"

std::pair<int, int> MapCommonEvents(std::vector<FSM_struct> & FSMArray, unsigned int UpperBound, bool printState);

void GenerateOptimalSubgroups(std::vector<FSM_struct> & FSMArray);



#endif
