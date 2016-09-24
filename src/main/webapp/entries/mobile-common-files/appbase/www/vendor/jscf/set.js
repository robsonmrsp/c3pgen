/*
 * Set: an exclusive, non-sequential data structure
 * $Id: set.js 1553 2003-04-05 05:23:21Z scott $
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
 * Creates a new set. The 'size' argument refers to the number of buckets that
 * will be used in the hash table of the map backing this set.
 * 
 * A set is essentially a non-sequential collection of objects that does not
 * allow duplicate entries. Any attempt to add an object that is equal to an
 * object already contained by the set results in the current object being 
 * replaced by the new one.
 *
 * Internally, a set uses a map for storage, and a map stores its elements
 * non-sequentially. Therefore, the list of objects returned by its values()
 * method is not guaranteed to (and will almost never) retain the objects' 
 * original order of insertion.
 *
 * dependency: Map
 */
function Set(size)
{	
	this.map = new Map(size);
}

/*
 * The placeholder object used as a value in all sets' internal maps.
 */
Set.placeholder = new Object();

/*
 * Gets the size of this set, the number of elements it contains.
 */
Set.prototype.size = function()
{	
	return this.map.size();
}

/*
 * Tests whether this set is empty (contains no elements).
 */
Set.prototype.isEmpty = function()
{	
	return this.map.isEmpty();
}

/*
 * Clears this set, emptying it of all stored elements.
 */
Set.prototype.clear = function()
{	
	return this.map.clear();
}

/*
 * Adds an object to this set. This method returns true if the object was
 * inserted without overwriting another object that was already present, false
 * if an object was overwritten.
 */
Set.prototype.add = function(obj)
{	
	return (this.map.put(obj, Set.placeholder) == null);
}

/*
 * Tests whether an object is contained by this set.
 */
Set.prototype.contains = function(obj)
{	
	return this.map.containsKey(obj);
}

/*
 * Removes an element from this set. This method returns true if an element was
 * actually removed from this set, false if no such element was present.
 */
Set.prototype.remove = function(obj)
{	
	return (this.map.remove(obj) == Set.placeholder);
}

/*
 * Gets a list of the elements contained in this set, as an array of objects.
 * Since sets do not store their elements sequentially, this method will almost
 * certainly return an array of elements in a different order than the order in
 * which they were inserted.
 */
Set.prototype.values = function()
{	
	return this.map.keys();
}

/*
 * Gets a string representation of this set.
 */
Set.prototype.toString = function()
{	
	return "[object Set]";
}
