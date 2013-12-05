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
    unsigned int state;
    std::pair<unsigned int, EventTypeMask> parent;
    std::string event;
    int pathCost;
    EventTypeMask mask;
    
    DjikstraNode()
      :state(0),
      parent(std::make_pair(0,DEFAULT_EVENT_MASK)),
      event(""),
      pathCost(-1),
      mask(DEFAULT_EVENT_MASK){};
      
    DjikstraNode(unsigned int state_, std::pair<unsigned int, EventTypeMask> parent_, std::string event_, int cost_, EventTypeMask mask_)
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
    const std::pair<unsigned int, EventTypeMask> Pop(bool &);
    void Push(unsigned int, std::string event, EventTypeMask);
    unsigned int GetSize(void);
    bool IsEmpty(void);
    unsigned int GetNumberOfStates(void);
    std::string PrintPath( unsigned int encodedState, EventTypeMask mask );
    
  private:
    std::unordered_map<std::pair<unsigned int, unsigned int>, DjikstraNode> * nodes;
    std::priority_queue<DjikstraNode> * pQueue;
    
    unsigned int currentState;
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
