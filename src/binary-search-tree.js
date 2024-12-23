const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    // добавляет узел с данными в дерево
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchNode(this.rootNode, data);

    //возвращает булевое значение если узел с данными есть в дереве
    function searchNode(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchNode(node.left, data);
      } else {
        return searchNode(node.right, data);
      }
    }
  }

  find(data) {
    //возвращает узел с данными существует в дереве, иначе null
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootNode = deleteNode(this.rootNode, data);
    //удаляет узел с данными, если он существует
    //найти узел по дате
    //провеерить тип - корень, узел, лист
    //если лист - просто удаляем
    //если есть 1 потомок, на место удаляемого узла перемещаем потомка
    // если 2 потомка - найми мин справа и поместить одного на текующую позицию, наименьшего удалить???

    function deleteNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }
        let min = node.right;
        while (min.left) {
          min = min.left;
        }
        node.data = min.data;
        node.right = deleteNode(node.right, min.data);
        return node;
      }
    }
  }

  min() {
    //возвращает минимальное значение в дереве (слева)
    if (!this.rootNode) {
      return;
    }
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    //возвращает максимальное значение(справа)
    if (!this.rootNode) {
      return;
    }
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
