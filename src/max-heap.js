const Node = require('./node');

class MaxHeap {

    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.lastInsertedNode = null;
        // parentNodes содержит узлы, у которых хотя бы один из слотов свободен
        this.heapSize = 0;
    } /* done */

    push(data, priority) {
        let tmpNode = new Node( data, priority );
        this.insertNode( tmpNode );
        this.shiftNodeUp( this.lastInsertedNode );
        return this;
    } /* done */

    findNodeInParents( node ) {
        let result = -1;
        for( let i=0; i<this.parentNodes.length; i++ ){
            let currParent = this.parentNodes[ i ];
            if( 
                currParent.data === node.data && 
                currParent.priority === node.priority ) 
                {
                    result = i; break;
                }
        }
        return result;
    } /* aux function, done. Returns index or -1 */

    swapParentNodes( firstPosition, secondPosition ) {

        let tmpNode = this.parentNodes[ firstPosition ];
        this.parentNodes[ firstPosition ] = this.parentNodes[ secondPosition ];
        this.parentNodes[ secondPosition ] = tmpNode;


    } /* aux function, done */

    pop() {
        let detachedRoot = null;
        let result = null;


        if( !this.isEmpty() ){ 

            detachedRoot = this.detachRoot();
            this.restoreRootFromLastInsertedNode( detachedRoot );
            this.shiftNodeDown( this.root );
            this.heapSize -=1;
        }

        if( detachedRoot ){
            result = detachedRoot.data;
        }

        return result;
    } /* pop() */

    detachRoot() {

        let oldRoot = null;

        if( !this.isEmpty ){

            oldRoot = this.root;
            let oldRootIndex = this.findNodeInParents( root );
            if( oldRootIndex !== -1 ){
                this.parentNodes.splice( oldRootIndex, 1 );
            }
            this.root = null;
        }

        return oldRoot;

    } /* detachRoot() */

    restoreRootFromLastInsertedNode( detached ) {
        
    }

    size() {
        return this.heapSize;
    } /* done */

    isEmpty() {
        return this.heapSize < 1;
    } /* */

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
        this.lastInsertedNode = null;
    } /* done */

    insertNode( node ) {
        let parentNode = null || this.parentNodes[ 0 ];
        this.parentNodes.push( node );
        this.heapSize +=1;

        if( !this.root ){ 
            this.root = node;
        } else {

            if( parentNode ){
                parentNode.appendChild( node );
                if( parentNode.left && parentNode.right ){
                    // if the current parent if filled after insertion
                    this.parentNodes.splice( 0, 1 );
                }
            }

        }
        this.lastInsertedNode = node;

    } /* done */

    shiftNodeUp( node ) {
        let parentNode = node.parent;
        let isSwapped = false;
        

        if( parentNode ){

            let pnsNodeIndex = this.findNodeInParents( node );
            let pnsParentIndex = this.findNodeInParents( parentNode );

            // swapping nodes if needed
            if( parentNode.left && parentNode.isLeft( node ) ){
                if( node.priority > parentNode.priority ){
                    node.swapWithParent();
                    isSwapped = true;
                }
            }

            if( parentNode.right && parentNode.isRight( node ) ){
                if( node.priority < parentNode.priority ){
                    node.swapWithParent();
                    isSwapped = true;
                }
            }

            // correcting this.parentNodes
            if( pnsNodeIndex !== -1 && pnsParentIndex !== -1 ){
                this.swapParentNodes( pnsNodeIndex, pnsParentIndex );
            }

            if( pnsNodeIndex == -1 && pnsParentIndex !== -1 ){
                this.parentNodes[ pnsParentIndex ] = node;
            }

            if( pnsNodeIndex !== -1 && pnsParentIndex == -1 ){
                this.parentNodes[ pnsNodeIndex ] = parentNode;
            }

        }

        let newNode = node;
        let newParent = node.parent || null;

        if( !newParent ){
            this.root = newNode;
        }

        if( isSwapped ){
            this.shiftNodeUp( newNode );
        }

    }

    shiftNodeDown(node) {


    }
}

module.exports = MaxHeap;
