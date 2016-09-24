/*

 * Map: a dictionary data structure based on a hash table
 * $Id: map.js 1932 2004-04-20 05:04:18Z scott $
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
 * Creates a new map. This method simply initializes the internal hash table
 * backing this map. The optional argument 'size' refers to the number
 * of buckets that will be used in this map's internal hash table. If
 * this argument is unspecified, not a number, or less than one, a
 * default value of 10 buckets is used.
 *
 * A map stores a series of elements. Each element is a key and its
 * corresponding value. Once an element is added using put(), the key can then
 * be used to retrieve its corresponding value using get(). Keys must be
 * defined and non-null, and a map does not allow duplicate keys. An attempt to
 * add an element when its key is already present results in the current
 * element's value being replaced by the new one. The values themselves must be
 * defined, but can be null. Multiple duplicate values are permitted.
 *
 * Internally, a map uses a hash table to store elements inserted into it.
 * This hash table uses several buckets as storage, and the number of
 * buckets can be specified at construction. Each bucket is a chain of 
 * elements, and the appropriate bucket location of any given element is
 * determined by computing a hash code based on the element's key. The hash 
 * table implementation used by this map uses chaining to resolve collisions.
 */

Map.prototype._hashCode = function(obj) {
	var str = JSON.stringify(obj);
	var hashCode = -1;
	for (var i = 0; i < str.length; i++) {
		hashCode = hashCode * 31 + str.charCodeAt(i);
	}
	return hashCode;
}

function Map(size) {
	this.buckets = new Array();

	if (isNaN(size) || size < 1)
		size = 10;

	for (var i = 0; i < size; i++)
		this.buckets[i] = new Bucket();
}
/*
 * Finds the appropriate bucket for a given object using its hash code.
 */
Map.prototype.bucketFor = function(obj) {
	with (this) {
		return buckets[this._hashCode(obj) % buckets.length];
	}
}

/*
 * Gets the size of the map, the number of elements it contains.
 */
Map.prototype.size = function() {
	var sz = 0;

	with (this) {
		for (var i = 0; i < buckets.length; i++)
			sz += buckets[i].depth;
	}

	return sz;
}

/*
 * Tests whether this map is currently empty (has no elements).
 */
Map.prototype.isEmpty = function() {
	with (this) {
		for (var i = 0; i < buckets.length; i++)
			if (buckets[i].depth > 0)
				return false;
	}

	return true;
}

/*
 * Gets an array of the keys in this map.
 */
Map.prototype.keys = function() {
	var a = new Array();

	with (this) {
		var bucket, e;
		for (var i = 0; i < buckets.length; i++) {
			bucket = buckets[i];

			for (e = bucket.first; e != null; e = e.next)
				a[a.length] = e.key;
		}
	}

	return a;
}

/*
 * Gets an array of the values in this map.
 */
Map.prototype.values = function() {
	var a = new Array();

	with (this) {
		var bucket, e;
		for (var i = 0; i < buckets.length; i++) {
			bucket = buckets[i];

			for (e = bucket.first; e != null; e = e.next)
				a[a.length] = e.value;
		}
	}

	return a;
}

/*
 * Tests whether this map contains the specified key.
 */
Map.prototype.containsKey = function(key) {
	if (key && key != null) {
		with (this) {
			var bucket = bucketFor(key);

			for (var e = bucket.first; e != null; e = e.next)
				if (e.key == key)
					return true;
		}
	}

	return false;
}

/*
 * Tests whether this map contains the specified value.
 */
Map.prototype.containsValue = function(value) {
	if (value) {
		with (this) {
			var bucket, e;

			for (var i = 0; i < buckets.length; i++) {
				bucket = buckets[i];

				for (e = bucket.first; e != null; e = e.next)
					if (e.value == value)
						return true;
			}
		}
	}

	return false;
}

/*
 * Adds an element to this map. The key must be defined and non-null. The value
 * must be defined, but can be null.
 * 
 * If a key is currently contained in this map that is the same as the key to be
 * added, the new element is inserted in place of the old one and the old
 * element's value is then returned. If the new key is not already present, this
 * method returns null.
 */
Map.prototype.put = function(key, value) {
	with (this) {
		return (key && key != null && value) ? bucketFor(key).add(key, value) : null;
	}
}

/*
 * Gets the value associated with the specified key, if any. Otherwise, this
 * method returns null.
 */
Map.prototype.get = function(key) {
	if (key && key != null) {
		with (this) {
			var bucket = bucketFor(key);

			for (var e = bucket.first; e != null; e = e.next)
				if (e.key == key)
					return e.value;
		}
	}

	return null;
}

/*
 * Removes the element with the specified key from this map, if any such key is
 * present. The removed element is then returned. If no such key is present in
 * this map, this method returns null. If an element is successfully removed,
 * ths size of this map decreases by 1.
 */
Map.prototype.remove = function(key) {
	if (key && key != null) {
		with (this) {
			return bucketFor(key).remove(key);
		}
	}

	return null;
}

/*
 * Clears this map. This method reduces the size of the map to 0.
 */
Map.prototype.clear = function() {
	with (this) {
		for (var i = 0; i < buckets.length; i++)
			buckets[i].clear();
	}
}

/*
 * Gets a string representation of this map.
 */
Map.prototype.toString = function() {
	var a = '[';
	var keys = this.keys();
	for (var index = 0; index < keys.length; index++) {
		var key = keys[index];

		a += '(' + key + ', ' + this.get(key) + ') ,'
	}
	return a + ' ]';
}

/*
 * A hash table bucket that holds entries.
 */
function Bucket() { // stores the number of elements contained
	this.depth = 0;
	// the first element in the chain
	this.first = null;
}

/*
 * Adds an entry to this bucket. If an entry already existed with the same key,
 * its value is replaced and the old value is then returned.
 */
Bucket.prototype.add = function(key, value) {
	with (this) {
		if (first != null) // look for the key
		{
			for (var e = first; e != null; e = e.next) {
				if (e.key == key) // same key already present
				{
					var old = e.value;
					e.value = value;
					return old;
				}
			}
		}

		// bucket empty or key not present, add a new entry
		first = new Entry(key, value, first);
		depth++;
	}

	return null;
}

/*
 * Removes an entry from this bucket. If an entry was removed, its value is
 * returned and the bucket's depth is decreased by one.
 */
Bucket.prototype.remove = function(key) {
	with (this) {
		if (first != null) {
			for (var e = first, prev = null; e != null; prev = e, e = e.next) {
				if (e.key == key) {
					if (prev == null) // it's the first entry
						first = e.next;
					// otherwise, link previous to next
					else
						prev.next = e.next;

					depth--;
					return e.value;
				}
			}
		}
	}

	return null;
}

/*
 * Removes all entries from this bucket.
 */
Bucket.prototype.clear = function() {
	with (this) {
		first = null;
		depth = 0;
	}
}

/*
 * Gets a string representation of this bucket.
 */
Bucket.prototype.toString = function() {
	return "[object Bucket]";

}

/*
 * A map entry. This object simply ties a key to its associated value. An entry
 * also stores a reference to the next object in the chain of entries in the
 * bucket they belong to.
 */
function Entry(k, val, nxt) {
	this.key = k;
	this.value = val;
	this.next = nxt ? nxt : null;
}

/*
 * Gets a string representation of this entry.
 */
Entry.prototype.toString = function() {
	return "[object Entry]";
}
