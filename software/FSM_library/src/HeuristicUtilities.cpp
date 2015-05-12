#include "HeuristicUtilities.h"

using namespace std;

void printHeader(const vector<FSM_struct> & FSMArray);

pair<int, int> MapCommonEvents( const vector<FSM_struct> & FSMArray, const unsigned long int UpperBound, bool printMap)
{
  vector< vector<int> > sharedEvents;
  int bestMetric = 0, bestStateSpace = 0;
  pair<int, int> bestFSMs = make_pair(-1, -1);

/*
  //~~~~~~~~Find union of all events~~~~~~~~~~~~
  vector<string> allEvents;
  for(int i=0; i<FSMArray.size(); i++)
  {
    vector<string> temp(allEvents.size() + FSMArray[i].alphabet.size());
    sort(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end());
    vector<string>::iterator it = set_union(allEvents.begin(), 
                                            allEvents.end(),
                                            FSMArray[i].alphabet.begin(), 
                                            FSMArray[i].alphabet.end(),
                                            temp.begin());
    temp.resize(it-temp.begin());
    allEvents = temp;
  }
  for(int i=0; i<allEvents.size(); i++)
  {
    cout << allEvents[i] << " 0 c o" << endl;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/ 
  
  //Print header 
  if(printMap) printHeader(FSMArray);
  
  //Examine each pair of FSM to find most similar pairs
  for(int i=0; i<(FSMArray.size()-1); i++)
  {
    //Print indent
    if(printMap) cout << i << (i<10)?"  ":" ";

    //Make a row to store pairs
    vector<int> row;
    for(int j=0; j<=i; j++)
    {
      if(printMap) cout << "...";
      row.push_back(0);
    }
    
    //Calculate pair similarity
    for(int j=i+1; j<FSMArray.size(); j++)
    {
      //Allocate copies of the event sets to be sorted
      vector<string> eventSet1(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end());
      vector<string> eventSet2(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end());
      
      //Sort the event set copies
      sort(eventSet1.begin(), eventSet1.end());
      sort(eventSet2.begin(), eventSet2.end());
      
      //Find the intersection of these sets
      vector<string> intersection(eventSet1.size() + eventSet2.size());
      vector<string>::iterator it = set_intersection(eventSet1.begin(), eventSet1.end(), 
                                                     eventSet2.begin(), eventSet2.end(), intersection.begin());
      intersection.resize(it-intersection.begin());
      
      //Calculate and store the similarity of the FSM's
      int eventSimilarity = 100 * intersection.size()/( eventSet1.size() + eventSet2.size() - intersection.size() );
      row.push_back(eventSimilarity);
         
      //Print the new statistic
      if(printMap)
      {
        if(eventSimilarity == 0)        cout << "-  ";
        else if(eventSimilarity >= 10 ) cout << eventSimilarity << " ";
        else                         cout << eventSimilarity << "  ";
      }
 
      //Record the best pair so far
      if(eventSimilarity > bestMetric)
      {
        //Calculate the maximum possible state space
        unsigned int statespace = FSMArray[i].GetNumberOfStates() * FSMArray[j].GetNumberOfStates();
        
        //
        if(find(eventSet1.begin(), eventSet1.end(), "DDC") == eventSet1.end() 
        && find(eventSet1.begin(), eventSet1.end(), "DDC") == eventSet1.end()
        && statespace <= UpperBound )
        {
          bestStateSpace = statespace;
          bestMetric = eventSimilarity;
          bestFSMs = make_pair(i, j);
        }
      }
    }
    
    if(printMap) cout << endl;
    sharedEvents.push_back(row);
    
  }
  
  if(printMap) cout << endl;
  
  return bestFSMs;
}

void GenerateOptimalSubgroups(const vector<FSM_struct> & FSMArr)
{
	/* Optimization Parameters */
	long unsigned int BestMetricSoFar = -1;
	unsigned int BestMaskSoFar;
	
	unsigned int mask = 0;
	int NumberOfFSMs = FSMArr.size();
	
	vector<FSM_struct> Group1, Group2;
	
	for(unsigned int mask=0; mask < (1<<NumberOfFSMs); mask++)
	{
		/* Split FSM's into 2 groups for parallel composition */
		for(int i=0; i < NumberOfFSMs; i++)
		{
			if( (mask >> i) & 0x1 )
			{
				Group1.push_back(FSMArr[i]);
			}
			else 
			{
				Group2.push_back(FSMArr[i]);
			}
		}
		/***************************************************/
		
		
		/* Primary analytics on feasibility of computation */
		
		/***************************************************/
		
		
		
		/***** Run Parallel Compostion on Each Group ******/
		
		long unsigned int Size1 = 1;
		for(int i=0; i<Group1.size(); i++)
			Size1 *= Group1[i].GetNumberOfStates(); // = ParComp();
			
		long unsigned int Size2 = 1;
		for(int i=0; i<Group2.size(); i++)
			Size2 *= Group2[i].GetNumberOfStates(); // = ParComp();
			
		/***************************************************/
		
		
		
		
		/********** Compare Optimization Metric ************/
		long unsigned int Metric = Size1 * Size2 * ( 2 + ceil(log2(Size1)) + ceil(log2(Size2)) )/8;
		
		if(Metric < BestMetricSoFar)
		{
			BestMetricSoFar = Metric;
			BestMaskSoFar = mask;
			//system("mv test1.fsm best1.fsm");
			//system("mv test2.fsm best2.fsm");
		}
		/***************************************************/
		
		cout << bitset<10>(mask) << "\t";
		
		for(int i=0; i<Group1.size(); i++)
		{
			cout<<Group1[i].fsmName<<", ";
			
		}
		cout << "\t";
		for(int i=0; i<Group2.size(); i++)
		{
			cout<<Group2[i].fsmName<<", ";
			
		}
		cout << "\t";
		cout << Size1 << "\t" << Size2 << "\t" << hex<<Metric << endl;
		
		Group1.clear();
		Group2.clear();
	}
	
}

/*
 * @brief Helper function to reduce code length
 */
void printHeader(const vector<FSM_struct> & FSMArray)
{
  cout << "Index" << endl;
  for(int i=0; i<FSMArray.size(); i++)
  {
    cout << i << "\t" << FSMArray[i].fsmName << "\t" << FSMArray[i].alphabet.size() << " events\t" << FSMArray[i].GetNumberOfStates() << " states" << endl;
  }
  cout << endl<<"   ";
  for(int i=0; i<FSMArray.size(); i++)
  {
    if(i<10)
      cout << i << "  ";
    else
      cout << i << " ";
  }
  cout<<endl;
}
  



