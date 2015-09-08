/*
 * List: a sequential, non-exclusive data structure
 * $Id: list.js 1606 2003-10-24 21:06:35Z scott $
 * Copyright (C) 2001-2003 Scott Martin (http://www.coffeeblack.org/contact/)
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * as published by the Free Software Foundation; either version 2.1
 * of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, it is available from the Free Software
 * Foundation, Inc. at http://www.gnu.org/copyleft/lesser.html or in writing at
 * 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
 
/*
 * Creates a new list. This method simply initializes the internal array
 * backing this list.
 *
 * A list functions a lot like an array, but adds the ability to set,
 * insert and remove elements at an arbitrary index and automatically shift
 * the other list elements to the correct positions. Also, the first and
 * last index of a given element can be determined, and the contains() method
 * can be used to test the presence of an element before accessing it.
 *
 * List elements must be defined, but can be null. A list allows multiple 
 * duplicate elements to be added. A list can also be sorted by providing a 
 * sort function to the sort() method.
 */ 
function List()
{	
	this.elements = new Array();
}

/*
 * Gets the size of the list, the number of elements it contains.
 */
List.prototype.size = function()
{	
	return this.elements.length;
}

/*
 * Tests whether this list is currently empty (has no elements).
 */
List.prototype.isEmpty = function()
{	
	return (this.elements.length == 0);
}

/*
 * Adds an element to this list. The element must be defined and can be null.
 *
 * If no index is specified, the element is appended to the end of this list.
 * Otherwise, the element is inserted at the specified index and all elements
 * that occur after that index are shifted to the right (their indeces are
 * increased by 1). If the specified index is negative, it is increased to 0.
 * If the specified index exceeds the size of this list, it is reduced
 * to this size of this list.
 */
List.prototype.add = function(value, index)
{	
	if(value) // don't add undefined elements
	{	
		with(this)	
		{	// if index is not present or invalid,
			// append to the end of the list
			if(isNaN(index) || !checkIndex(index))
				index = elements.length;

			// shift elements after value to the right
			if(index < elements.length)
			{	
				for(var i = elements.length; i > index; i--)
					elements[i] = elements[i - 1];
			}

			elements[index] = value;
		}
	}
}

/*
 * Sets the element at the specified index to the value of the new element.
 * The element must be defined and can be null. The index must be defined
 * and must be within the bounds of the size of this list (at least zero
 * and less than its size).
 */
List.prototype.set = function(value, index)
{	
	if(value && !isNaN(index) && this.checkIndex(index))
		this.elements[index] = value;
}

/*
 * Gets the element the specified index. If index is not defined, the
 * first element (at index 0) is returned.
 *
 * If defined, the index must be within the bounds of the size of this
 * list (at least zero and less than its size). Otherwise, this method
 * returns null.
 */
List.prototype.get = function(index)
{	
	with(this)
	{	
		if(isNaN(index))
			return first();
	
		return (checkIndex(index)) ? elements[index] : null;
	}
}

/*
 * Gets the first element in this list, if the list is not empty.
 */
List.prototype.first = function()
{	
	with(this)
	{	
		return (isEmpty()) ? null : get(0);
	}
}

/*
 * Gets the last element in this list, if the list is not empty.
 */
List.prototype.last = function()
{	
	with(this)
	{	
		return (isEmpty()) ? null : get(elements.length - 1);
	}
}

/*
 * Removes and returns the element at the specified index, if it is within
 * the bounds of this list (at least zero and less than its size). If the
 * index is not defined, 0 is used. If an element is successfully removed,
 * all elements occuring after the index of the removed element are shifted
 * left (their indeces are decreased by 1). The size of the list is then
 * decreased by 1.
 */
List.prototype.remove = function(index)
{	
	if(isNaN(index))
		index = 0;
	
	var obj = null;
		
	with(this)	
	{	
		if(checkIndex(index))
		{	
			obj = elements[index];
		
			// shift the other elements up one
			for(var j = index; j < (elements.length - 1); j++)
				elements[j] = elements[j + 1];

			// last element is invalid, chop it off
			elements.length -= 1;
		}
	}
	
	return obj;
}

/*
 * Tests whether this list contains the specified value.
 */
List.prototype.contains = function(value)
{	
	return (this.indexOf(value) != -1);
}

/*
 * Gets the first index of the specified value in this list, if it is present.
 * If not, this method returns -1.
 */
List.prototype.indexOf = function(value)
{	
	if(value)
	{	
		with(this)
		{	
			for(var i = 0; i < elements.length; i++)
				if(elements[i] == value)
					return i;
		}
	}
	
	return -1;
}

/*
 * Gets the last index of the specified value in this list, if it is present.
 * If not, this method returns -1.
 */
List.prototype.lastIndexOf = function(value)
{	
	if(value)
	{	
		with(this)
		{	
			for(var i = (elements.length - 1); i >= 0; i--)
				if(elements[i] == value)
					return i;
		}
	}

	return -1;
}

/*
 * Sorts this list according to the specified sort function. If the sort
 * function is not defined, the elements are sorted using the default
 * no-argument sort function Array.sort().
 */
List.prototype.sort = function(sortFunc)
{	
	if(sortFunc && sortFunc != null)
		this.elements.sort(sortFunc);
	else this.elements.sort();	
}

/*
 * Clears this list. This method reduces the size of the list to 0.
 */
List.prototype.clear = function()
{	
	this.elements.length = 0;
}

/*
 * Utility method that performs bounds checking on an element index.
 */
List.prototype.checkIndex = function(index)
{	
	return (index >= 0 && index < this.elements.length);
}

/*
 * Gets a string representation of this list.
 */
List.prototype.toString = function()
{	
	return "[object List]";
}
