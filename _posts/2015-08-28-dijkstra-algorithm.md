---
date: 2015-08-28 20:23:46 PM
title: 对 Dijkstra's Algorithm 的体会
categories: thinking
---

Dijkstra 算法以前就用到过，但并没有形成深刻的认识。它可以用来求两点之间的最短距离，比如，我们从一个地方到另外一个地方，需要找一条最短的路径，就可以用到此算法。该算法也可以用到分析其他的问题，比如 Currency Exchange Problem，可阅读 [Melissa Yan][Melissa Yan] 的讲稿。

不管怎样，这些问题都可以抽象成图的最短路问题，这在数据结构、数学建模和算法导论里面都有描述。对于这样的问题，只要确定起始点 v，Dijkstra 执行完一遍可以得到 v 到其余所有点的最短距离。

凝视着数据结构上的 Dijkstra's Algorithm 良久，仍然没弄懂其算法流程。最后，在网上查阅一番，发现维基百科上有一个该算法的[动态图][Dijkstra's algorithm wiki]。照着这个图动手画一画，然后再看算法的关键迭代式，思路就比较清晰了。

    dist[i] = min {dist[i], dist[k] +  arc[k][i]}

理解了算法，就想动手实现，于是想用 JavaScript 写。搜一搜，实际上 GitHub 上已经有各种版本的算法实现。想想还是算了，只是由于没懂 Dijkstra 这个算法，要来把它解决了。

对于要查找任意两点之间的距离的情况，建议提前全部计算获得，后面直接根据下标提取，这样效率会比较高。而查找每一对点之间的距离，也可以用 Floyd 算法，它形式上更简单，并且对于全部查找的情况，两者的时间复杂度都是 O(n<sup>3</sup>)。对于像 2011 年的《交巡警服务平台》这个数学建模题，就能够用得上这两个算法。

至此，就是我看 Dijkstra's Algorithm 的心得体会，并没有要详述算法的意思。

[Dijkstra's algorithm wiki]: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
[Melissa Yan]: http://math.mit.edu/~rothvoss/18.304.3PM/Presentations/1-Melissa.pdf