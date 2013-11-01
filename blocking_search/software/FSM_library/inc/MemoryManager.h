#ifndef _MEMORY_MANAGER_H_
#define _MEMORY_MANAGER_H_

#include <bitset>
#include <stack>
#include <vector>
#include <stdexcept>
#include <iostream>
#include <stdlib.h>
#include <cmath>
#include <set>

#include "FSMDataStructures.h"

//#define WORSTCASE_NUMBER_OF_STATES 10000000
#define WORSTCASE_NUMBER_OF_STATES 1800000000

class MemoryManager
{
private:
  /* DFS memory structures */
  std::bitset<WORSTCASE_NUMBER_OF_STATES> * accessed; 
  std::stack<unsigned int> searchStack;
  std::set<unsigned int> specialStates;
   
  /* FSM parameters */
  int numberOfStateMachines;
  unsigned int actualStateSpace;
  std::vector<int> numbits;
  std::vector<int> offset;
  std::vector<int> accumulator;
  
  /* Conversion functions */
  unsigned int EncodedStateToIndex(unsigned int encodedState);
  unsigned int IndexToEncodedState(unsigned int index);

public:
  MemoryManager(std::vector<FSM_struct> & FSMArray);
  ~MemoryManager();
  
  bool GetBit(unsigned int encodedState);
  void SetBit(unsigned int encodedState);
  void FlipBits(void);
  unsigned int GetNumberOfSetBits(void);
  unsigned int GetNumberOfUnsetBits(void);
  
  unsigned int PopOffStack(void);
  void PushOnStack(unsigned int encodedState);
  unsigned int GetSizeOfStack(void);
  bool IsStackEmpty(void);
  
  bool IsSpecialState(unsigned int state);
  void AddSpecialState(unsigned int state);
  void RemoveSpecialState(unsigned int state);
  unsigned int GetNumberOfSpecialStates(void);
  void ClearAllSpecialStates(void);
  

  //unsigned int GetIntersectionCardinality(MemoryManager & m1);
};


#endif
