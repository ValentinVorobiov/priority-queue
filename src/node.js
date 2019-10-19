class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        node.parent = this;

        if( this.left === null ){
            this.left = node;
        } else if( this.right === null ){
            this.right = node;
        }

        return this;
    }

    isFull( ){
        return this.left && this.right;
    } /* aux function: returns true if node child slots are filled */

    ifFree(  ){
        return !this.left && !this.right;
    } /* aux function: returns true if BOTH node child slots are empty */

    isLeft( node ){
        // is the @node LEFT child of current node ( this )
        let result = false;
        if( this.left && 
            this.left.data === node.data &&
            this.left.priority === node.priority
            ){
            result = true;
        }
        return result;
    }

    isRight( node ){
        // is the @node RIGHT child of current node ( this )
        let result = false;
        if( this.right && 
            this.right.data === node.data &&
            this.right.priority === node.priority
            ){
            result = true;
        }
        return result;
    }

    removeChild(node) {
        let childExists = false;
        if( this.isLeft( node ) ){
            this.left = null;
            node.parent = null;
            childExists = true;
        }
        if( this.isRight( node ) ){
            this.right = null;
            node.parent = null;
            childExists = true;
        }
        if( !childExists ){
            throw new Error( 'Node' + node +' is NOT a child of current!!! ' );
        }
        return this;
    }

    remove() {

        let currNode = this;
        let parentNode = this.parent;

        if( parentNode ){
            parentNode.removeChild( currNode );
        }

     }


    swapWithParent() {
        let nodeFather = null;
        let nodeGrandFather = null;
        let currentNode = this;
        let gfSide = 'none';

        nodeFather = this.parent;
        

        if( nodeFather ){

            nodeGrandFather = nodeFather.parent;

            if( nodeGrandFather ){
                // checking the side of Father in GrandFather
                if( nodeGrandFather.isLeft( nodeFather ) ){ gfSide = 'left'; }
                if ( nodeGrandFather.isRight( nodeFather ) ){ gfSide = 'right'; }
            }

            let currentNodeOldLeft = null || currentNode.left; 
            let currentNodeOldRight = null || currentNode.right ;

            let nodeFatherOldLeft = null || nodeFather.left;
            let nodeFatherOldRight = null || nodeFather.right;

            if( nodeFather.isLeft( currentNode ) ){
                // hoisting child is LEFT for father

                currentNode.left = nodeFather;
                nodeFather.parent = currentNode;

                if( currentNodeOldLeft ){ currentNodeOldLeft.parent = nodeFather; }
                if( currentNodeOldRight ){ currentNodeOldRight.parent = nodeFather; }

                currentNode.right = nodeFatherOldRight;
                if( currentNode.right ){ currentNode.right.parent = currentNode; }

                nodeFather.left = currentNodeOldLeft;
                if( nodeFather.left ){ nodeFather.left.parent = nodeFather; }
                nodeFather.right = currentNodeOldRight;
                if( nodeFather.right ){ nodeFather.left.parent = nodeFather; }


            }

            if( nodeFather.isRight( currentNode ) ){
                // hoisting child is RIGHT for father

                currentNode.right = nodeFather;
                nodeFather.parent = currentNode;

                if( currentNodeOldLeft ) { currentNodeOldLeft.parent = nodeFather; } 
                if( currentNodeOldRight ) { currentNodeOldRight.parent = nodeFather; }

                currentNode.left = nodeFatherOldLeft;
                if( currentNode.left ){ currentNode.left.parent = currentNode };

                nodeFather.left = currentNodeOldLeft;
                if( nodeFather.left ){ nodeFather.left.parent = nodeFather; }
                nodeFather.right = currentNodeOldRight;
                if( nodeFather.right ){ nodeFather.left.parent = nodeFather; }

            }


            if( gfSide == 'left' ){
                currentNode.parent = nodeGrandFather;
                nodeGrandFather.left = currentNode;

            }

            if( gfSide == 'right' ){
                currentNode.parent = nodeGrandFather;
                nodeGrandFather.right = currentNode;
            }

            if( gfSide == 'none' ){
                currentNode.parent = null;
            }

        }
    }

}

module.exports = Node;
