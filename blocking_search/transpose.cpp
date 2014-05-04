#include <iostream>
#include <iomanip>
#include <fstream>
#include <stack>
#include <stdlib.h>

using namespace std;

int main(int argc, char ** argv)
{
  if(argc != 3)
  {
    cout << "Usage: ./transpose <input_file> <output_file>" << endl;
    exit(1);
  }
  
  ifstream infile;
  infile.open(argv[1]);
  
  ofstream outfile;
  outfile.open(argv[2]);
  
  int numEvents;
  string junk;
  infile >> hex >> numEvents;
  infile >> junk;
  infile >> junk;
  infile >> junk;


  outfile << numEvents << " events." << endl << endl; 
  int counter = 0;
  while(!infile.eof() && infile.good())
  {
    stack<string> s;
    string state;
    infile >>  state;
    string end = state;

    if(!infile.good())
      break;
      
    while( state.compare("00000000") )
    {
      string event;
      infile >> event;

      s.push(event.substr(2,event.size()-4));
      infile >> state;
    }
    counter++;
    outfile << "00000000" << " -> ";
    while(!s.empty())
    {     
      outfile << s.top() << ", ";
      s.pop();
    }
    outfile << "-> " << end << endl; 
  }

  infile.close();
  outfile.close();
  
}