// #include "MemoryManager.h"
// 
// using namespace std;
// 
// /*
//  * @brief Constructor for memory manager
//  * @param numStates Vector corresponding to number of states in each FSM
//  */
// MemoryManager::MemoryManager( const vector<FSM_struct> & FSMArray)
// {
//   /* Resize all vectors to have proper size */
//   numberOfStateMachines = FSMArray.size();
//   numbits.resize(numberOfStateMachines);
//   offset.resize(numberOfStateMachines);
//   accumulator.resize(numberOfStateMachines);
//   
//   accessed = new bitset<WORSTCASE_NUMBER_OF_STATES>;
// 
//   /* Populate parameter vectors */
// 	for( int i=(numberOfStateMachines - 1); i>=0; i-- )
// 	{
// 	  if( i == (numberOfStateMachines - 1) )
// 	  {
// 	    offset[i] = 0;
// 	    accumulator[i] = 1;
// 	  }
// 	  else
// 	  {
// 	    offset[i] = offset[i+1] + numbits[i+1];
// 	    this->accumulator[i] = this->accumulator[i+1] * (FSMArray[i+1].GetNumberOfStates());
// 	  }
// 		
// 		numbits[i] = ceil( log2( FSMArray[i].GetNumberOfStates() ) );
// 	}
// 	
// 	actualStateSpace = accumulator[0]*FSMArray[0].GetNumberOfStates();
// }
// 
// /*
//  * @brief Destructor for memory manager
//  *        Delete bitset pointer. All other memory is on the stack
//  */
// MemoryManager::~MemoryManager(void)
// {
//   delete accessed;
// }
// 
// 
// /*
//  * @brief Calculates the encoded state value for a given bitset index
//  * @param index A composite state's index in the bitset
//  * @returns The state encoding
//  */
// EncodedStateType MemoryManager::IndexToEncodedState(unsigned int index)
// {	
// 	EncodedStateType encodedState = 0;
// 	unsigned int scalar;
// 	
// 	for(unsigned int i=0; i < numberOfStateMachines; i++)
// 	{
// 		scalar = index/accumulator[i];
// 		encodedState |= (scalar << offset[i]);
// 		
// 		index -= (scalar * accumulator[i]);	
// 	}
// 	return encodedState;
// }
// 
// 
// /*
//  * @brief Calculates the bitset index for a given composite state encoding
//  * @param encodedState A composite state encoding
//  * @returns The bitset index for a composite state
//  */
// unsigned int MemoryManager::EncodedStateToIndex(EncodedStateType encodedState)
// {	
// 	unsigned int index = 0;
// 	unsigned int scalar;
// 	
// 	for(unsigned int i=0; i < numberOfStateMachines; i++)
// 	{
// 	  scalar = (encodedState >> offset[i]) & ((1 << numbits[i]) - 1);
// 	  index += scalar * accumulator[i];
// 	}
// 	return index;
// }
// 
// /******************* BIT OPERATIONS **********************/
// /*
//  * @brief Determine the value of a state's bitset entry
//  * @param encodedState A composite state encoding
//  * @returns bit entry in bitset
//  */
// bool  MemoryManager::GetBit(EncodedStateType encodedValue)
// {
//   try
//   {
//     return accessed->test(EncodedStateToIndex(encodedValue));
//   }
//   catch(out_of_range)
//   {
//     cerr << "Bitset out of range when testing state " << encodedValue << ". Exiting." << endl;
//     exit(1);
//   }
// }
// 
// /*
//  * @brief Set a state's bitset entry to true
//  * @param encodedState A composite state encoding
//  * @returns bit entry in bitset
//  */
// void  MemoryManager::SetBit(EncodedStateType encodedValue)
// {
//   try
//   {
//     accessed->set(EncodedStateToIndex(encodedValue));
//   }
//   catch(out_of_range)
//   {
//     cerr << "Bitset out of range when setting state " << encodedValue << ". Exiting." << endl;
//     exit(1);
//   }
// }
// 
// /*
//  * @brief Flip bits in bitset
//  */
// void MemoryManager::FlipBits(void)
// {  
//   if(searchStack.empty())
//   {
//     accessed->flip(); 
//   }
//   else
//   {
//     cerr << "The search stack is not empty. Flipping bits will corrupt search space memory" << endl;
//   }
// }
// 
// /*
//  * @brief Number of unset bits
//  * @returns Number of unset bits
//  */
// unsigned int MemoryManager::GetNumberOfUnsetBits(void)
// {
//   return accessed->size() - accessed->count();
// }
// 
// /*
//  * @brief Get the number of set bits
//  * @returns number of set bits
//  */
// unsigned int MemoryManager::GetNumberOfSetBits(void)
// {
//   return accessed->count();
// }
// /********************************************************************/
// 
// 
// 
// /************************* STACK OPERATIONS *************************/
// /*
//  * @brief Push given state onto stack if unaccessed, set accessed bit
//  * @param encodedState A composite state encoding
//  * @param mask The mask with which this states will add events
//  */
// void MemoryManager::PushOnStack(EncodedStateType encodedState, EventTypeMask mask)
// {
//   //  The following logic is fairly implementation-specific:
//   //  In order to enforce arc constraints (DDC->DC), we must generate new states.
//   //  In an accessibility search, 
//   //    a new state is created when a DDC event is triggered. In this case, the 
//   //    new state only allows event DC, while the other state allows all events.
//   //    There is no encoding for the new state, so we keep a copy of it in the 
//   //    hash table.
//   if( mask == DC_EVENT || mask == DDC_EVENT ) 
//   {
//     unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.find(encodedState);
//     if( !limitedSearchSpaceFlag && (it == stateMasks.end()) )
//     {      
//       //Push event onto the search stack
//       searchStack.push(encodedState);
//       
//       //Set entry in hash to make sure state is only seen once
//       stateMasks.insert(make_pair(encodedState, SpecialState(mask)));     
//     }
//     else if( limitedSearchSpaceFlag && (it != stateMasks.end()) && !it->second.accessed )
//     {
//       //Push event onto the search stack
//       searchStack.push(encodedState);
//       
//       //Mark state as accessed
//       it->second.accessed = true;
//       it->second.mask = mask;    
//     }
//     return;
//   }
//   
//   else if( !GetBit(encodedState) )
//   {
//     //Push event onto the search stack
//     searchStack.push(encodedState);
// 
//     //Set bit so that state is not revisited
//     SetBit(encodedState);
//   }
// }   
// 
// 
// /*
//  * @brief Pops off an encoded state from the stack
//  *        Fetches that entry in the stateMask map and removes it
//  *        If no entry exists, assign default mask
//  * @returns (Encoded state , event mask for that state)
//  */
// pair<EncodedStateType, EventTypeMask> MemoryManager::PopOffStack(void)
// {
//   //Pop event off top
//   EncodedStateType nextState = searchStack.top();
//   searchStack.pop();
//   
//   //Look for mask in hash table
//   unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.find(nextState);
//   if(it != stateMasks.end())
//   {
//     if(it->second.accessed && !it->second.popped)
//     {
//       it->second.popped = true; 
//       return make_pair(nextState, it->second.mask);
//     }
//   }
//     
//   return make_pair(nextState, DEFAULT_EVENT_MASK);
// }
// 
// /*
//  * @brief Get the stack size
//  * @returns Size of stack
//  */
// unsigned int MemoryManager::GetSizeOfStack(void)
// {
//   return (unsigned int)searchStack.size();
// }
// 
// /*
//  * @brief Test if the stack is empty
//  * @returns true if stack is empty
//  */
// bool MemoryManager::IsStackEmpty(void)
// {
//   return searchStack.empty();
// }
// 
// /****************************************************************/
// 
// 
// 
// /******************* SPECIAL STATES OPERATORS ********************/
// /* 
//  * @brief Set the limited search space flag, and reset the popped
//  *        flag in each special entry. This will restrict
//  *        special states to those with entries already in the map.
//  *        This is useful in a coaccessibility search.
//  * @note  Will
//  */
// void MemoryManager::LimitSearchSpaceOfCreatedStates(void)
// {
//   if(!searchStack.empty())
//   {
//     cerr << "The search stack is not empty. Unsetting flags on created states will corrupt search memory." << endl;
//     return;
//   }
//   
// 
//   for(unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.begin();
//       it != stateMasks.end(); it++)
//   {
//     if( !it->second.popped || !it->second.accessed )
//     {
//       //If unset popped value is found, undo all flag unsetting, and print error.
//       for(unordered_map<EncodedStateType, SpecialState>::iterator it2 = stateMasks.begin();
//          it2 != it; it2++ )
//       {
//         it2->second.popped = true;
//         it2->second.accessed = true;
//       }
//       cerr << "Unset flags were found in created states. Search has not been completed." << endl;
//       return;
//     }
//     
//     //Set popped and accessed to false
//     it->second.popped = false;
//     it->second.accessed= false;
//   }
//   
//   //Set flag
//   limitedSearchSpaceFlag = true;
// }
// /*
//  * @brief Return the number of entries in the map accessed in the search
//  * @returns count of entries where accessed == true
//  */
// unsigned int MemoryManager::GetNumberOfCreatedStates(void)
// {
//   unsigned int counter = 0;
//   for(unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.begin();
//     it != stateMasks.end(); it++)
//   {
//     if(it->second.accessed)
//     {
//       counter++;
//     }
//   }
//   return counter;
// }
// 
// /*
//  * @brief Return the number of entries in the map accessed in the search
//  * @returns count of entries where accessed == true
//  */
// unsigned int MemoryManager::GetNumberOfUnsetCreatedStates(void)
// {
//   unsigned int counter = 0;
//   for(unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.begin();
//     it != stateMasks.end(); it++)
//   {
//     if(!it->second.accessed)
//     {
//       counter++;
//     }
//   }
//   return counter;
// }
// 
// 
// /*
//  * @brief Clear the special states set
//  */
// void MemoryManager::ClearAllCreatedStates(void)
// {
//   stateMasks.clear();
// }
// 
// 
// /*
//  * @brief Tests whether a state is a blocking state
//  * @note This should not be implemented as such... NEEDS TO BE PROTECTED MORE
//  */
// bool MemoryManager::IsBlockingState(EncodedStateType destination, string event)
// {
//   if(event.compare("DDC"))
//   {
//     return GetBit(destination);
//   }
//   else
//   {
//     unordered_map<EncodedStateType, SpecialState>::iterator it = stateMasks.find(destination);
//     if(it == stateMasks.end())
//     {
//       return false;
//     }
//     if(!it->second.accessed)
//     {
//       return true;
//     }
//     return false;
//   }
// }
// /***********************************************************************************/
// 
// /*************** STATISTICS FUNCTIONS **********************************************/
// // NOTE: Although access to these functions is needed by users of MemoryManager,
// //       these functions may be more appropriately implemented in StatsObject
// //       S. Lanham 11/6/13
// 
// /*
//  * @brief Update maximum stack size, increment amount of points seen
//  *        and maintain random sample.
//  *
//  */
// void MemoryManager::UpdateStatistics(unsigned int numberOfStatesAccessed)
// {
//   //Update the max stack value
//   if(GetSizeOfStack() > stats.maxStackSize )
//   {
//     stats.maxStackSize = GetSizeOfStack();
//   }
//   
//   //Increment the points seen
//   stats.numberOfPointsSeen++;
//   
//   //If points seen are less than sample size, add to buffer
//   if(stats.sample.size() < stats.sampleSize)
//   {
//     stats.sample.push_back(StatsPoint(numberOfStatesAccessed, GetSizeOfStack(), GetNumberOfCreatedStates())); 
//   }
//   else
//   { 
//     //Otherwise, with probability = sampleSize/pointsSeen, select random element to be replaced 
//     if( (rand()%stats.numberOfPointsSeen) < stats.sampleSize )
//     {
//       stats.sample[rand()%stats.sampleSize] = StatsPoint(numberOfStatesAccessed, GetSizeOfStack(), GetNumberOfCreatedStates());
//     }
//   }
// }
// 
// /*
//  * @brief Reset all statistics
//  */
// void MemoryManager::ClearStatistics(void)
// {
//   stats.maxStackSize = 0;
//   stats.numberOfPointsSeen = 0;
//   stats.sample.clear();
// }
// 
// /*
//  * @brief Print statistics, namely a memory profile
//  */
// void MemoryManager::PrintStatistics(void)
// {
//   /******* Calculate plot parameters ***********************/
//   unsigned int widthInChars = 100, heightInChars = 20;
//   unsigned int MaxX = 0, MinX = 0, MaxY = stats.maxStackSize, MinY = 0;
//   for(int n=0; n<stats.sample.size(); n++)
//   {
//     if(stats.sample[n].statesAccessed > MaxX)
//     {
//       MaxX = stats.sample[n].statesAccessed;
//     }
//   }  
//   unsigned int ResX = (MaxX-MinX)/widthInChars, ResY = (MaxY-MinY)/heightInChars;
//   /********************************************************/
//   
//   /******* Populate 2-D vector with plot data *************/
//   // NOTE: If desired, data about created states may be added here also
//   vector<vector<bool> > plot(widthInChars, vector<bool>(heightInChars,0));
//   for(int n=0; n<stats.sample.size(); n++)
//   {
//     int x = stats.sample[n].statesAccessed/ResX;
//     int y = stats.sample[n].stackSize/ResY;
//     if(x<widthInChars && y<heightInChars)
//     {
//       plot[stats.sample[n].statesAccessed/ResX][stats.sample[n].stackSize/ResY] = 1;
//     }
//   }
//   /********************************************************/
//   
//   /************* PRINT Graph - ASCII art ******************/
//   //~~~~~~~~~~~~ Meta Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//   if(MaxY > 1000){
//     cout << " Stack Size (x1000) " << endl;
//   }
//   else{
//     cout << " Stack Size " << endl;
//   }  
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//   
//   //~~~~~~~~~~~ Chart Area ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/      
//   for(int y = heightInChars-1; y>=0; y--)
//   {
//     if(!((y+1)%4)){
//       if(MaxY > 1000)
//         cout << " "<<setw(2)<<(int)(MaxY*double((double)y/(double)heightInChars/1000))<<"|";
//       else
//         cout<<setw(3)<<(int)(MaxY*double((double)y/(double)heightInChars))<<"|";
//     }
//     else
//       cout << "   |";
//     for(int x=0; x<widthInChars; x++)
//     {
//       if(plot[x][y]){
//         cout << '#';
//       }
//       else if( (y < (heightInChars-1)) && plot[x][y+1] ){
//         plot[x][y] = 1;
//         cout << '#';
//       }
//       else 
//         cout << ' ';
//     }
//     cout << endl;
//   }
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//   
//   //~~~~~~~~~~~~ X-axis ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/  
//   cout <<"   ";
//   for(int x=0; x<=widthInChars; x++){
//     if(!(x%10))
//       cout << '+';
//     else
//       cout<<'-';
//   }
//   cout<<endl<<"   ";
//   
//   for(int x=0; x<widthInChars; x++){
//     if(!((x+2)%10)){
//       cout<<setw(4)<<(int)(MaxX*double((double)x/(double)widthInChars/1000));
//       x+=3;
//     }
//     else
//       cout << ' ';
//    }
//   cout<<endl;
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
// }
// /***********************************************************************************/
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
