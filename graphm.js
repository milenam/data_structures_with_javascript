
function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    //this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.toString = toString;
  this.showGraph = showGraph;
  this.marked = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.marked[i] = false;
  }
  this.dfs = dfs;
  this.bfs = bfs;
  this.edgeTo = [];

  this.isMemberOfSet = function (sourceVertex, member) {
    return this.adj[sourceVertex].indexOf(member) != -1
  };

  this.intersectingElements = function(sourceSet, testSet) {
    var arr1Length = sourceSet.length;
    var commonValues = [];

    for (i = 0; i < arr1Length; i++) {
      if (testSet.indexOf(sourceSet[i]) != -1) {
        commonValues.push(sourceSet[i]);
      }
    }
    //
    //console.log(sourceSet + " -> " + commonValues);
    return commonValues;
  }

  this.hops = function (sourceVertex, destinationVertex, path, oneHop, twoHops) {
    var counter = 0;
    if (!this.isMemberOfSet(sourceVertex, destinationVertex))  {
     if(path.indexOf(sourceVertex) == -1) {
      path.push(sourceVertex);
     }
      // If the sourceVertex # is in destinationVertex's nearest neighbors
      var nearestIntersections = this.intersectingElements(this.adj[sourceVertex], this.adj[destinationVertex]);
      if(nearestIntersections.length > 0) {
        var arr = [];
        for(var i in nearestIntersections) {
          arr.push(nearestIntersections[i]);
        }
        if (arr.length > 1) {
          path.push("{" + arr + "}");
        } else {
          path.push(arr);
        }
        oneHop = true;
      }

      if ((!this.isMemberOfSet(destinationVertex, sourceVertex)) && (oneHop != true)) {
        //path.push(sourceVertex);
        for (var i in this.adj[destinationVertex]) {
          var visitingNode = this.adj[destinationVertex][i];

          var intersecting = this.intersectingElements(this.adj[visitingNode], this.adj[sourceVertex]);
          //console.log('ii', this.adj[visitingNode])
          if (intersecting.length > 0) {
            //for (var j in intersecting) {
            if (path.indexOf(intersecting[0]) == -1) {
              path.push(intersecting[0]);
            }
            if (path.indexOf(this.adj[destinationVertex][i]) == -1) {
              path.push(this.adj[destinationVertex][i]);
            }
              twoHops = true;
            //}
          }
        }


      }

    }
    console.log(oneHop, twoHops)
    if ((oneHop == false) && (twoHops == false)) {
      //console.log('path', path);
      //this.recursive(sourceVertex, destinationVertex, path);
      for (var k in this.adj[sourceVertex]) {

        this.hops(8, destinationVertex, path, oneHop, twoHops);
      }
        //counter++;
        //console.log();

      //}
    }
  }

  this.recursive = function(sourceVertex, destinationVertex, path) {
    //console.log('path', path);
    var intersecting = this.intersectingElements(this.adj[sourceVertex], this.adj[destinationVertex]);
    console.log('erfewr',intersecting.length);
    if (intersecting.length == 0) {
      //path.push(sourceVertex);
      this.recursive(sourceVertex-1, destinationVertex, path);
    } else {
      path.push(intersecting);
    }
  }

  this.shortestPath = function(sourceVertex, destinationVertex) {
    var path = [sourceVertex];
    var oneHop = false;
    var twoHops = false;
    //console.log('jh',this.adj[destinationVertex]);
    this.hops(sourceVertex, destinationVertex, path, oneHop, twoHops);

    path.push(destinationVertex);
    return path.toString();
  }
}



function addEdge(v,w) {
  if(this.adj[v].indexOf(w) == -1) {
    this.adj[v].push(w);
  }

  if(this.adj[w].indexOf(v) == -1) {
    this.adj[w].push(v);
  }
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
    var members = [];
    console.log('node2:', this.adj[i]);
    for (var j = 0; j < this.vertices; ++j) {
      if (this.adj[i][j] != undefined) {
        members.push(this.adj[i][j]);
      }
    }
    console.log("node: ", i + "->" + members.toString());
  }
}

function dfs(v) {
  var start = new Date().getTime();
  this.marked[v] = true;
  if (this.adj[v] != undefined) {
        console.log("dfs Visited vertex: " + v);
     }
  for each (var w in this.adj[v]) {
    if (!this.marked[w]) {
    this.dfs(w);
    }
  }
  var stop = new Date().getTime();
  var res = stop - start;
  console.log('milliseconds: ',res);
}

function bfs(s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s); // add to back of queue
  while (queue.length > 0) {
    var v = queue.shift(); // remove from front of queue
    if (v != undefined) {
      console.log("bfs Visited vertex: " + v);
    }

    for each (var w in this.adj[v]) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    }
  }
}





g = new Graph(10);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,2);
g.addEdge(1,4);
g.addEdge(3,2);
g.addEdge(7,8);
g.addEdge(3,0);
g.addEdge(4,5);
g.addEdge(5,2);
g.addEdge(7,5);
g.addEdge(5,6);
g.addEdge(5,7);
g.addEdge(6,5);
g.addEdge(6,7);
g.addEdge(4,2);
g.addEdge(9,8);
g.showGraph();
//g.bfs(6);
console.log("is true when is member", g.isMemberOfSet(6, 5) === true); // should be true
console.log("is true when is not member", g.isMemberOfSet(6, 1) === false); // should be false
//console.log("when one hop, outputs the two nodes",
            //g.shortestPath(6, 5) === "6,5"); // should be true
//console.log('when more than one hop, undefined',g.shortestPath(6, 0)); // should be flase
console.log('members of destination include source', g.shortestPath(6, 2));
console.log("when two sets intersect, return intersecting values",
           g.intersectingElements([1,2,3], [2,3,4]).length === 2);
console.log("when two sets don't intersect, return empty array",
           g.intersectingElements([1,2,3], [4,5,6]).length === 0);
console.log("when more than two paths are the same distance, output both",
            g.shortestPath(4, 0));
console.log("when more than two hops away, consider each verticies children",
            g.shortestPath(9,0));

//////

for (var t = this.adj.indexOf(this.adj[sourceVertex]); t < this.adj.length; t++) {
          console.log('this t',this.adj[t]);
          for (var b in this.adj[t]) {
            console.log('bt',this.adj[t]);
           if ((this.adj[t][b] != sourceVertex) && (this.adj[t][b] != undefined)) {
             this.recursive2(this.adj[t][b], destinationVertex, path2);
           }
          }
        }



        this.recursive2 = function(sourceVertex, destinationVertex, path2) {
    console.log('path2', path2);
    console.log(this.oneHop2, this.twoHops2)
    //this.hops(sourceVertex, destinationVertex, path, oneHop, twoHops);
    if ((this.oneHop2 == false) && (this.twoHops2 == false)) {
      if (!this.isMemberOfSet(sourceVertex, destinationVertex))  {
       if(path2.indexOf(sourceVertex) == -1) {
        path2.push(sourceVertex);
       }
        // If the sourceVertex # is in destinationVertex's nearest neighbors
        var nearestIntersections = this.intersectingElements(this.adj[sourceVertex], this.adj[destinationVertex]);
        if(nearestIntersections.length > 0) {
          var arr = [];
          for(var i in nearestIntersections) {
            arr.push(nearestIntersections[i]);
          }
          if (arr.length > 1) {
            path2.push("{" + arr + "}");
          } else {
            path2.push(arr);
          }
          this.oneHop2 = true;
        }

        if ((!this.isMemberOfSet(destinationVertex, sourceVertex)) && (this.oneHop2 != true)) {
          //path.push(sourceVertex);
          for (var i in this.adj[destinationVertex]) {
            var visitingNode = this.adj[destinationVertex][i];

            var intersecting = this.intersectingElements(this.adj[visitingNode], this.adj[sourceVertex]);
            //console.log('ii', this.adj[visitingNode])
            if (intersecting.length > 0) {
              //for (var j in intersecting) {
              //if (path.indexOf(intersecting[0]) == -1) {
              console.log('int2', intersecting[0])
                path2.push(intersecting[0]);
              //}
              console.log(this.adj[destinationVertex][i]);
              if (path2.indexOf(intersecting[0] == -1)) {
                path2.push(this.adj[destinationVertex][i]);
              }

              this.twoHops2 = true;
              //}
            }
          }
        }
      }
    }
  }

///////// last



function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    //this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.toString = toString;
  this.showGraph = showGraph;
  this.marked = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.marked[i] = false;
  }
  this.dfs = dfs;
  this.bfs = bfs;
  this.edgeTo = [];
  this.oneHop = false;
  this.twoHops = false;
  this.oneHop2 = false;
  this.twoHops2 = false;

  this.isMemberOfSet = function (sourceVertex, member) {
    return this.adj[sourceVertex].indexOf(member) != -1
  };

  this.intersectingElements = function(sourceSet, testSet) {
    var arr1Length = sourceSet.length;
    var commonValues = [];

    for (i = 0; i < arr1Length; i++) {
      if (testSet.indexOf(sourceSet[i]) != -1) {
        commonValues.push(sourceSet[i]);
      }
    }
    //
    //console.log(sourceSet + " -> " + commonValues);
    return commonValues;
  }

  this.hops = function (sourceVertex, destinationVertex, path, temp) {
    var counter = 0;
    this.recursive(sourceVertex, destinationVertex, path, temp);
    //this.recursive2(sourceVertex, destinationVertex, path2);

    //console.log(this.oneHop, this.twoHops)
    if ((this.oneHop == false) && (this.twoHops == false)) {
      //console.log('path', path);
      //this.recursive(sourceVertex, destinationVertex, path, oneHop, twoHops);
      //var intersecting = this.intersectingElements(this.adj[sourceVertex], this.adj[destinationVertex]);
      //console.log('erfewr',this.adj[sourceVertex]);
      //if (intersecting.length == 0) {
        //console.log('this o',this.adj.indexOf(this.adj[sourceVertex]));
        //path.push(sourceVertex);
        for (var i = this.adj.indexOf(this.adj[sourceVertex]); i > 0; i--) {
          console.log('this i',this.adj[i]);
          for (var j in this.adj[i]) {
            //console.log(this.adj[i][j]);
           if ((this.adj[i][j] != sourceVertex) && (this.adj[i][j] != undefined)) {
             console.log('j',j);
             this.recursive(this.adj[i][j], destinationVertex, path, temp[j]);
             //temp.push(temp);
           }
          }
        }
       //console.log('length', this.adj.length)


      //} //else {
        //path.push(intersecting);
      //}

    }
  }

  this.recursive = function(sourceVertex, destinationVertex, path, temp) {
    //console.log('path', path);
    console.log(this.oneHop, this.twoHops)
    //this.hops(sourceVertex, destinationVertex, path, oneHop, twoHops);
    //if ((this.oneHop == false) && (this.twoHops == false)) {
      if (!this.isMemberOfSet(sourceVertex, destinationVertex))  {
       if(path.indexOf(sourceVertex) == -1) {
        temp.push(sourceVertex);
       }
        // If the sourceVertex # is in destinationVertex's nearest neighbors
        var nearestIntersections = this.intersectingElements(this.adj[sourceVertex], this.adj[destinationVertex]);
        if(nearestIntersections.length > 0) {
          var arr = [];
          for(var i in nearestIntersections) {
            arr.push(nearestIntersections[i]);
          }
          if (arr.length > 1) {
            temp.push("{" + arr + "}");
          } else {
            temp.push(arr);
          }
          this.oneHop = true;
        }

        if ((!this.isMemberOfSet(destinationVertex, sourceVertex)) && (this.oneHop != true)) {
          //path.push(sourceVertex);
          for (var i in this.adj[destinationVertex]) {
            var visitingNode = this.adj[destinationVertex][i];

            var intersecting = this.intersectingElements(this.adj[visitingNode], this.adj[sourceVertex]);
            //console.log('ii', this.adj[visitingNode])
            if (intersecting.length > 0) {
              //for (var j in intersecting) {
              //if (path.indexOf(intersecting[0]) == -1) {
              console.log('int', intersecting[0])
                temp.push(intersecting[0]);
              //}
              console.log(this.adj[destinationVertex][i]);
              if (temp.indexOf(intersecting[0] == -1)) {
               temp.push(this.adj[destinationVertex][i]);
              }

              this.twoHops = true;
              //}
            }
          }
        }
      }
    //}
  }


  this.shortestPath = function(sourceVertex, destinationVertex) {
    var path = [sourceVertex];
    var temp = [];
    var temp2 = [];
    for (var i = 0; i < 10; ++i) {
      temp[i] = [];
      //this.adj[i].push("");
    }
    //console.log('jh',this.adj[destinationVertex]);
    this.hops(sourceVertex, destinationVertex, path, temp);

    path.push(destinationVertex);
    //path2.push(destinationVertex);
    console.log('path',temp)


    for (var i = 0; i < temp.length; i++) {
      if ((temp[i].length != 0) && (temp[i].length != 1))
      temp2.push(temp[i].length);
      min = Math.min.apply(Math, temp2);
      console.log(min);
      if (temp[i].length == min) {
        console.log(temp[i]);
      }
    }

    //min = Math.min.apply(Math, temp2)
   // console.log(min);
    //console.log(temp2);
    //var index = 0;



    //var value = temp[0];


    //console.log('pathhhh 2',path2)
    return path.toString();
  }
}



function addEdge(v,w) {
  if(this.adj[v].indexOf(w) == -1) {
    this.adj[v].push(w);
  }

  if(this.adj[w].indexOf(v) == -1) {
    this.adj[w].push(v);
  }
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
    var members = [];
    console.log('node2:', this.adj[i]);
    for (var j = 0; j < this.vertices; ++j) {
      if (this.adj[i][j] != undefined) {
        members.push(this.adj[i][j]);
      }
    }
    console.log("node: ", i + "->" + members.toString());
  }
}

function dfs(v) {
  var start = new Date().getTime();
  this.marked[v] = true;
  if (this.adj[v] != undefined) {
        console.log("dfs Visited vertex: " + v);
     }
  for each (var w in this.adj[v]) {
    if (!this.marked[w]) {
    this.dfs(w);
    }
  }
  var stop = new Date().getTime();
  var res = stop - start;
  console.log('milliseconds: ',res);
}

function bfs(s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s); // add to back of queue
  while (queue.length > 0) {
    var v = queue.shift(); // remove from front of queue
    if (v != undefined) {
      console.log("bfs Visited vertex: " + v);
    }

    for each (var w in this.adj[v]) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    }
  }
}





g = new Graph(10);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,2);
g.addEdge(1,4);
g.addEdge(3,2);
g.addEdge(7,8);
g.addEdge(3,0);
g.addEdge(4,5);
g.addEdge(5,2);
g.addEdge(7,5);
g.addEdge(5,6);
g.addEdge(5,7);
g.addEdge(6,5);
g.addEdge(6,7);
g.addEdge(4,2);
g.addEdge(9,8);
//g.addEdge(9,0);
//g.addEdge(10,0);
//g.addEdge(9,10);
//g.addEdge(9,11);
//g.showGraph();
console.log(g);
//g.bfs(6);
console.log("is true when is member", g.isMemberOfSet(6, 5) === true); // should be true
console.log("is true when is not member", g.isMemberOfSet(6, 1) === false); // should be false
//console.log("when one hop, outputs the two nodes",
            //g.shortestPath(6, 5) === "6,5"); // should be true
//console.log('when more than one hop, undefined',g.shortestPath(6, 0)); // should be flase
//console.log('members of destination include source', g.shortestPath(6, 2));
//console.log("when two sets intersect, return intersecting values",
           //g.intersectingElements([1,2,3], [2,3,4]).length === 2);
//console.log("when two sets don't intersect, return empty array",
           //g.intersectingElements([1,2,3], [4,5,6]).length === 0);
console.log("when more than two paths are the same distance, output both",
            g.shortestPath(1, 8));
//console.log("when more than two hops away, consider each verticies children",
            //g.shortestPath(1,8));
