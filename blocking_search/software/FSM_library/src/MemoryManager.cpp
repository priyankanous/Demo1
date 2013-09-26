#include "MemoryManager.h"

using namespace std;

/*
 * Constructor for memory manager
 * @param numStates Vector corresponding to number of states in each FSM
 */
MemoryManager::MemoryManager(std::vector<int> & numStates)
 /* :numberOfStateMachines(numStates.size()),
  numbits(numberOfStateMachines),
  offset(numberOfStateMachines),
  accumulator(numberOfStateMachines)*/
{
  /* Resize all vectors to have proper size */
  numberOfStateMachines = numStates.size();
  numbits.resize(numberOfStateMachines);
  offset.resize(numberOfStateMachines);
  accumulator.resize(numberOfStateMachines);


  /* Populate parameter vectors */ 
	for( int i=(numberOfStateMachines - 1); i>=0; i-- )
	{
	  if( i == (numberOfStateMachines - 1) )
	  {
	    offset[i] = 0;
	    accumulator[i] = 1;
	  }
	  else
	  {
	    offset[i] = offset[i+1] + numbits[i+1];
	    accumulator[i] = accumulator[i+1] * numStates[i+1];
	  }
		
		numbits[i] = ceil(log2(numStates[i]));
		
	}
}

/*
 * @brief Calculates the encoded state value for a given bitset index
 * @param index A composite state's index in the bitset
 * @returns The state encoding
 */
unsigned int MemoryManager::IndexToEncodedState(unsigned int index)
{	
	unsigned int encodedState = 0;
	unsigned int scalar;
	
	for(unsigned int i=0; i < numberOfStateMachines; i++)
	{
		scalar = index/accumulator[i];
		encodedState |= (scalar << offset[i]);
		
		index -= (scalar * accumulator[i]);	
	}
	return encodedState;
}


/*
 * @brief Calculates the bitset index for a given composite state encoding
 * @param encodedState A composite state encoding
 * @returns The bitset index for a composite state
 */
unsigned int MemoryManager::EncodedStateToIndex(unsigned int encodedState)
{	
	unsigned int index = 0;
	unsigned int scalar;
	
	for(unsigned int i=0; i < numberOfStateMachines; i++)
	{
	  scalar = (encodedState >> offset[i]) & ((1 << numbits[i]) - 1);
	  index += scalar * accumulator[i];
	}
	return index;
}


/*
 * @brief Determine the value of a state's bitset entry
 * @param encodedState A composite state encoding
 * @returns bit entry in bitset
 */
bool  MemoryManager::GetBit(unsigned int encodedValue)
{
  try
  {
    return accessed.test(EncodedStateToIndex(encodedValue));
  }
  catch(out_of_range)
  {
    cerr << "Bitset out of range when testing state " << encodedValue << ". Exiting." << endl;
    exit(1);
  }
}


/*
 * @brief Set a state's bitset entry to true
 * @param encodedState A composite state encoding
 * @returns bit entry in bitset
 */
void  MemoryManager::SetBit(unsigned int encodedValue)
{
  try
  {
    accessed.set(EncodedStateToIndex(encodedValue));
  }
  catch(out_of_range)
  {
    cerr << "Bitset out of range when setting state " << encodedValue << ". Exiting." << endl;
    exit(1);
  }
}


/*
 * @brief Push given state onto stack if unaccessed, set accessed bit
 * @param encodedState A composite state encoding
 */
void MemoryManager::PushOnStack(unsigned int encodedState)
{
  if( !GetBit(encodedState) )
  {
    searchStack.push(encodedState);
    SetBit(encodedState);
  }
}   



/*
 * @brief Pops off an encoded state from the stack
 * @returns popped encoded state
 */
unsigned int MemoryManager::PopOffStack(void)
{
  unsigned int nextState = searchStack.top();
  searchStack.pop();
  return nextState;
}

/*
 * @brief Get the stack size
 * @returns Size of stack
 */
unsigned int MemoryManager::GetSizeOfStack(void)
{
  return (unsigned int)searchStack.size();
}

/*
 * @brief Test if the stack is empty
 * @returns true if stack is empty
 */
bool MemoryManager::IsStackEmpty(void)
{
  return searchStack.empty();
}









