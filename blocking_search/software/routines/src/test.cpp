#include <cmath>
#include <iostream>
#include <stdlib.h>

using namespace std;


unsigned int index2encoderB(unsigned int index, unsigned int * accumulator, unsigned int * offset)
{	
	unsigned int encoder = 0;
	unsigned int scalar;
	
	for(unsigned int i=0; i < 5; i++)
	{
		scalar = index/accumulator[i];
		encoder |= (scalar << offset[i]);
		
		index -= (scalar * accumulator[i]);	
	}
	return encoder;
}

unsigned int encoder2indexB(unsigned int encoder, unsigned int * accumulator, unsigned int * offset, unsigned int * numbits)
{	
	unsigned int index = 0;
	unsigned int scalar;
	
	for(unsigned int i=0; i < 5; i++)
	{
	  scalar = (encoder >> offset[i]) & ((1<<numbits[i]) - 1);
	  index += scalar * accumulator[i];
	}
	return index;
}
	
unsigned int index2encoder(unsigned int index, unsigned int * accumulator, unsigned int * coefficient)
{	
	unsigned int encoder = index;
	unsigned int scalar;
	
	for(unsigned int i=0; i < 5; i++)
	{
		scalar = floor(index/accumulator[i]);
		encoder += (scalar * coefficient[i]);	
	}
	return encoder;
}

unsigned int encoder2index(unsigned int encoder, unsigned int * accumulator, unsigned int * coefficient)
{	
	unsigned int index = encoder;
	unsigned int scalar;
	
	for(unsigned int i=0; i < 4; i++)
	{
		scalar = floor( index / (accumulator[i]) );
		index -= (scalar * coefficient[i+1]);
	}
	return index;
}


int main(void)
{
unsigned int numStates[5] = {1, 1, 3, 8, 9};
unsigned int numbits[5], offset[5], coefficient[5], i2e_accumulator[5], e2i_accumulator[5], accumB[5];

	offset[4] = 0;
	numbits[4] = ceil(log2(numStates[4]));
	coefficient[4] = ((1<<numbits[4]) - numStates[4])*(1<<offset[4]);
	i2e_accumulator[4] = numStates[4];
	e2i_accumulator[4] = (1 << numbits[4]);
  accumB[4] = 1;
	for(int i=3; i>=0; i--)
	{
		numbits[i] = ceil(log2(numStates[i]));
		offset[i] = offset[i+1] + numbits[i+1];
		coefficient[i] = ( (1 << numbits[i]) - numStates[i]) * (1 << offset[i]);
		i2e_accumulator[i] = i2e_accumulator[i+1] * numStates[i];
		e2i_accumulator[i] = (1<<offset[i]);
    accumB[i] = accumB[i+1]*numStates[i+1];
	}
/*

int numberOfFsm = 5;
	for( int i=(numberOfFsm - 1); i>=0; i-- )
	{
	  if( i == (numberOfFsm - 1) )
	  {
	    offset[i] = 0;
	    i2e_accumulator[i] = numStates[i];
	  }
	  else
	  {
	    offset[i] = offset[i+1] + numbits[i+1];
	    i2e_accumulator[i] = i2e_accumulator[i+1] * numStates[i];
	  }
		
		numbits[i] = ceil(log2(numStates[i]));
		coefficient[i] = ( (1 << numbits[i]) - numStates[i]) * (1 << offset[i]);
		e2i_accumulator[i] = (1<<offset[i]);

	}

*/


	cout << "numStates:       ";
	for(int i=0; i<5; i++)
		cout << numStates[i] << "\t";
	cout << endl;
	
	cout << "numbits:         ";
	for(int i=0; i<5; i++)
		cout << numbits[i] << "\t";
	cout << endl;
	
	cout << "offset:          ";
	for(int i=0; i<5; i++)
		cout << offset[i] << "\t";
	cout << endl;
	
	cout << "coefficient:     ";
	for(int i=0; i<5; i++)
		cout << coefficient[i] << "\t";
	cout << endl;
	
	cout << "i2e_accumulator: ";
	for(int i=0; i<5; i++)
		cout << i2e_accumulator[i] << "\t";
	cout << endl;
	
	cout << "e2i_accumulator: ";
	for(int i=0; i<5; i++)
		cout << e2i_accumulator[i] << "\t";
	cout << endl;
	
	unsigned int counter = 0;
	unsigned int encoder = 0;
	for(unsigned int a=0; a<numStates[0]; a++)
	{
		for(unsigned int b=0; b<numStates[1]; b++)
		{
			for(unsigned int c=0; c<numStates[2]; c++)
			{
				for(unsigned int d=0; d<numStates[3]; d++)
				{
					for(unsigned int e=0; e<numStates[4]; e++)
					{
						encoder = (a << offset[0]) | (b << offset[1]) | (c << offset[2]) | (d << offset[3]) | (e << offset[4]);
						
						//cout << counter << "\t" << encoder << endl;
						
						unsigned int newEn = index2encoder(counter, i2e_accumulator, coefficient);
						unsigned int newIn = encoder2index(encoder, e2i_accumulator, coefficient);
						unsigned int newEnB = index2encoderB(counter, accumB, offset);
						unsigned int newInB = encoder2indexB(encoder, accumB, offset, numbits);
						cout << counter  << "\t" << newInB << "\t" << encoder << "\t" << newEnB << endl;
						
						if( (encoder != newEn) || (counter != newIn) || (encoder != newEnB) || (counter != newInB) )
						{
							cerr << "You messed up." << endl;
							exit(1);
						}
						
						counter++;
					}
				}
			}
		}
	}
}
