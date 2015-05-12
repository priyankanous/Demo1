#ifndef _DJIKSTRA_MEMORY_MANAGER_H_
#define _DJIKSTRA_MEMORY_MANAGER_H_

#include <stdlib.h>
#include <iostream>
#include <queue>
#include <unordered_map>
#include <bitset>
#include <string>
#include <iomanip>

#include "FSMDataStructures.h"
#include "EventManager.h"

/* Define containter for hashmap */
struct DjikstraNode
{
  public:
    EncodedStateType state;
    std::pair<EncodedStateType, EventTypeMask> parent;
    std::string event;
    int pathCost;
    EventTypeMask mask;
    
    DjikstraNode()
      :state(0),
      parent(std::make_pair(0,DEFAULT_EVENT_MASK)),
      event(""),
      pathCost(-1),
      mask(DEFAULT_EVENT_MASK){};
      
    DjikstraNode(EncodedStateType state_, std::pair<EncodedStateType, EventTypeMask> parent_, std::string event_, int cost_, EventTypeMask mask_)
      :state(state_),
      parent(parent_),
      event(event_),
      pathCost(cost_),
      mask(mask_){};
      
    bool operator<(const DjikstraNode & other) const
    {
      if(other.pathCost < 0 || pathCost < 0)
      {
        std::cout << "The \"<\" operator was called on an uninitialized node" << std::endl;
        exit(1);
      }
      return (other.pathCost < pathCost);
    };    
};

class DjikstraMemoryManager
{
  public:
    DjikstraMemoryManager(); 
    const std::pair<EncodedStateType, EventTypeMask> Pop(bool &);
    void Push(EncodedStateType, std::string event, EventTypeMask);
    unsigned int GetSize(void);
    bool IsEmpty(void);
    unsigned int GetNumberOfStates(void);
    std::string PrintPath( EncodedStateType encodedState, EventTypeMask mask );
    
  private:
    std::unordered_map<std::pair<EncodedStateType, unsigned int>, DjikstraNode> * nodes;
    std::priority_queue<DjikstraNode> * pQueue;
    
    EncodedStateType currentState;
    int currentCost;
    EventTypeMask currentMask;
};
   
// Define hash function for pair<a,b>    
namespace std
{
  template<typename a, typename b>
  struct hash< std::pair<a, b> > {
  private:
     const hash<a> ah;
     const hash<b> bh;
  public:
     hash() : ah(), bh() {}
     size_t operator()(const std::pair<a, b> &p) const {
        return ah(p.first) ^ bh(p.second);
     }
  };
}

 
 
 



#endif   
