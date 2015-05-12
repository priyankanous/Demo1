// #include "DjikstraMemoryManager.h"
// 
// using namespace std;
// 
// DjikstraMemoryManager::DjikstraMemoryManager(void)
// {
//   //Set initial conditions
//   currentState = 0;
//   currentCost = -1;
//   currentMask = DEFAULT_EVENT_MASK;
//   
//   //Initialize memory structures
//   nodes = new unordered_map<pair<EncodedStateType, unsigned int>, DjikstraNode>;
//   pQueue = new priority_queue<DjikstraNode>;
// };
// 
// /*
//  * @brief Pops off an encoded state from the queue
//  *        Populates map with parent and weight
//  *        Returns null if queue empties.
//  * @returns pointer to (next encoded state, mask for that state)
//  */
// const pair<EncodedStateType, EventTypeMask> DjikstraMemoryManager::Pop(bool & empty)
// {
//   //Pop events until an unexplored one has been found
//   unordered_map<pair<EncodedStateType, unsigned int>, DjikstraNode>::iterator it;
//   bool success = false;
//   DjikstraNode nextNode;
//   
//   while(pQueue->size() > 0)
//   {
//     nextNode = pQueue->top();
//     pQueue->pop();
//     
//     it = nodes->find(make_pair(nextNode.state,(unsigned int)nextNode.mask));
//     if(it == nodes->end())
//     {
//       success = true;
//       break;
//     }
//   }
//   
//   //If stack is empty, return NULL pointer
//   if(!success)
//   {
//     empty = true;
//     return make_pair(0,DEFAULT_EVENT_MASK);
//   }
//   
//   //Generate composite key
//   pair<EncodedStateType, unsigned int> key = make_pair(nextNode.state,(unsigned int)nextNode.mask);
//   
//   //Update parameters and hash table with new node
//   currentState = nextNode.state;
//   currentCost = nextNode.pathCost;
//   currentMask = nextNode.mask;
//   nodes->insert(make_pair(key, nextNode));
//   
//   //Return the key    
//   return make_pair(nextNode.state, nextNode.mask);
// };
// 
// /*
//  * @brief Pushes on an encoded state, creates a node,
//  *        then enqueues the node in priority queue
//  * @returns nothing
//  */
// void DjikstraMemoryManager::Push(EncodedStateType encodedState, string event, EventTypeMask mask)
// {
//   //~~Enforce convention that initial state must be zero~~//
//   if(currentCost < 0)
//   {
//     if(encodedState != 0)
//     {
//       cout << "First state pushed on priority queue was not 0! Exiting." << endl;
//       exit(1);
//     }
//   }
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//   
//   //~~~~~~~~~~Check for state in hash maps~~~~~~~~~~~~~~~//
//   pair<EncodedStateType, unsigned int> key = make_pair(encodedState, (unsigned int)mask);
//   unordered_map<pair<EncodedStateType, unsigned int>, DjikstraNode>::iterator it;  
//   it = nodes->find(key);
//   
//   //If state has been found already, do not enqueue
//   if( it != nodes->end() )
//   {
//     return;
//   }
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// 
//   //~~~~~Create a node structure and enqueue it.~~~~~~//
//   DjikstraNode node(encodedState, make_pair(currentState,currentMask), event, (currentCost + 1), mask);
//   pQueue->push(node);
// /*cout << "State:" << encodedState << endl;
// cout << "Origin:" << currentState << endl;
// cout << "Origin Mask: " << currentMask << endl;
// cout << "Event: "  << event << endl;
// cout << "Cost: " << currentCost+1 << endl;
// char c; cin>>c;*/
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// };
//  
// unsigned int DjikstraMemoryManager::GetSize(void)
// {
//   return pQueue->size();
// };
// 
// unsigned int DjikstraMemoryManager::GetNumberOfStates(void)
// {
//   return nodes->size();
// };
// 
// bool DjikstraMemoryManager::IsEmpty(void)
// {
//   return (pQueue->size() <= 0);
// };
// 
// string DjikstraMemoryManager::PrintPath( EncodedStateType encodedState, EventTypeMask mask )
// {
//   stack<string> events;
//   pair<EncodedStateType, unsigned int> current = make_pair(encodedState, (unsigned int)mask);
//   unordered_map<pair<EncodedStateType, unsigned int>, DjikstraNode>::iterator it;
//   while(true)
//   {
//     
//     //Update current event mask 
//     if(current.second != DC_EVENT)
//     {
//       current.second = DEFAULT_EVENT_MASK;
//     }
//     
//     //Origin
//     if(current.first == 0)
//     {
//       //We have reached the origin. Unload the stack
//       stringstream ss;
//       ss << "00000000 -> ";
//       while(!events.empty())
//       {
//         string e = events.top();
//         events.pop();
//         ss << e << ", ";
//       }
//       return ss.str();
//     }
//     
//     it = nodes->find(current);
//     if(it == nodes->end() )
//     {
//       stringstream ss;
//       ss << "Path back to origin could not be found for state " << encodedState;
//       return ss.str();
//     }
//     else
//     {
//       //ss << hex << setw(8) << setfill('0') << current.first;
//       //ss << (it->second.mask==DEFAULT_EVENT_MASK?"":"_DDC");
//       string event = it->second.event;
//       EncodedStateType parent = it->second.parent.first;
//       if( (parent|0x7) == 4 )
//       {
//        event += "_TRANS"; 
//       }
//       events.push(event);
//       current = it->second.parent;
//     }
//   }
// }
// 
// 
// 
// 
// 
// 
// 
