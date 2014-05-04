#include "HeuristicUtilities.h"

using namespace std;

pair<int, int> MapCommonEvents( vector<FSM_struct> & FSMArray, unsigned long int UpperBound, bool printMap)
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
  
  if(printMap) 
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
  
  for(int i=0; i<(FSMArray.size()-1); i++)
  {
    if(printMap)
    {
      if(i<10)
        cout << i << "  ";
      else
        cout << i << " ";
    }
    vector<int> row;
    for(int j=0; j<=i; j++)
    {
      if(printMap) cout << "...";
      row.push_back(0);
    }
    for(int j=i+1; j<FSMArray.size(); j++)
    {
      sort(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end());
      sort(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end());
      
      vector<string> intersection(FSMArray[i].alphabet.size() + FSMArray[j].alphabet.size());
      vector<string>::iterator it = set_intersection(FSMArray[i].alphabet.begin(), 
                                                     FSMArray[i].alphabet.end(), 
                                                     FSMArray[j].alphabet.begin(), 
                                                     FSMArray[j].alphabet.end(), intersection.begin());
      
      intersection.resize(it-intersection.begin());
      int sharedEvents = 100 * intersection.size()/( FSMArray[i].alphabet.size() + FSMArray[j].alphabet.size() - intersection.size() );
      //int sharedEvents = instersection.size();
      
      if(printMap)
      {
        if(sharedEvents == 0)
        {
          cout << "-  ";
        }
        else
        {
          if(sharedEvents >= 10 )
            cout << sharedEvents << " ";
          else
            cout << sharedEvents << "  ";
        }
      }
      row.push_back(sharedEvents); 
      if(sharedEvents > bestMetric)
      {
        if(find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "DDC") == FSMArray[i].alphabet.end() 
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "fddl") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "fpdl") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "nddl1_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "ddl1_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "ddl2_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "pdl1_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "pdl2_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[i].alphabet.begin(), FSMArray[i].alphabet.end(), "npdl1_f") == FSMArray[i].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "DDC") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "fddl") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "fpdl") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "nddl1_f") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "ddl1_f") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "ddl2_f") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "pdl1_f") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "pdl2_f") == FSMArray[j].alphabet.end()
        && find(FSMArray[j].alphabet.begin(), FSMArray[j].alphabet.end(), "npdl1_f") == FSMArray[j].alphabet.end())
        {
          unsigned int statespace = FSMArray[i].GetNumberOfStates() * FSMArray[j].GetNumberOfStates();
          if( statespace <= UpperBound )
          {
            bestStateSpace = statespace;
            bestMetric = sharedEvents;
            bestFSMs = make_pair(i, j);
          }
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




