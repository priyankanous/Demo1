#ifndef _MEMORY_MANAGER_H_
#define _MEMORY_MANAGER_H_

#include <bitset>
#include <stack>
#include <vector>
#include <stdexcept>
#include <iostream>
#include <iomanip>
#include <stdlib.h>
#include <cmath>
#include <set>
#include <unordered_map>

#include "FSMDataStructures.h"
#include "EventManager.h"

/* This number is needed at compile time.
 * It will vary based on your system constraints and state space.
 */
#define WORSTCASE_NUMBER_OF_STATES 4294967296

/*
 * Structure for storing search data about special state
 * Intended to be stored in unordered_map<>
 */
struct SpecialState{
  EventTypeMask mask;
  bool popped;
  bool accessed;
  SpecialState(EventTypeMask m)
    :mask(m), popped(0), accessed(1){};
};

/*
 * Snapshot of memory structure at a given time
 */
struct StatsPoint{
  unsigned int statesAccessed;
  unsigned int stackSize;
  unsigned int statesCreated;
  StatsPoint(unsigned int a, unsigned int s, unsigned int c)
    :statesAccessed(a), stackSize(s), statesCreated(c){};
};

/*
 * Stores meta-data about the memory usage 
 */
struct StatsObject{
  unsigned int maxStackSize;
  const unsigned int sampleSize;
  unsigned int numberOfPointsSeen;
  std::vector<StatsPoint> sample;
  StatsObject()
    :maxStackSize(0), sampleSize(200), numberOfPointsSeen(0){};
};

class MemoryManager
{
private:
  /* DFS memory structures */
  std::bitset<WORSTCASE_NUMBER_OF_STATES> * accessed; 
  std::stack<EncodedStateType> searchStack;
  
  StatsObject stats;
  
  /*Search space flag */
  bool limitedSearchSpaceFlag;
  
  /* FSM parameters */
  int numberOfStateMachines;
  unsigned int actualStateSpace;
  std::vector<int> numbits;
  std::vector<int> offset;
  std::vector<int> accumulator;
  
  /* Conversion functions */
  unsigned int EncodedStateToIndex(EncodedStateType encodedState);
  EncodedStateType IndexToEncodedState(unsigned int index);

public:
  /* Object management */
  MemoryManager(const std::vector<FSM_struct> & FSMArray);
  ~MemoryManager();
  std::unordered_map<EncodedStateType, SpecialState> stateMasks;
  
  /* General Use */
  bool IsBlockingState(EncodedStateType, std::string);
  
  /* Bitset interaction functions */
  bool GetBit(EncodedStateType encodedState);
  void SetBit(EncodedStateType encodedState);
  void FlipBits(void);
  unsigned int GetNumberOfSetBits(void);
  unsigned int GetNumberOfUnsetBits(void);
  
  /* Stack interaction functions */
  std::pair<EncodedStateType, EventTypeMask> PopOffStack(void);
  void PushOnStack(EncodedStateType encodedState, EventTypeMask);
  unsigned int GetSizeOfStack(void);
  bool IsStackEmpty(void);
  
  /* Created states map */
  void LimitSearchSpaceOfCreatedStates(void);
  unsigned int GetNumberOfCreatedStates(void);
  void ClearAllCreatedStates(void);
  bool IsCreatedState(EncodedStateType, EventTypeMask);
  unsigned int GetNumberOfUnsetCreatedStates(void);
  
  
  
  /* Stats functions */
  void ClearStatistics(void);
  void UpdateStatistics(unsigned int numberOfStatesAccessed);
  void PrintStatistics(void);
  
};


#endif
