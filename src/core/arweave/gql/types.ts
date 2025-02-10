export enum ArweaveGQLSortOrder {
    HEIGHT_ASC = 'HEIGHT_ASC',
    HEIGHT_DESC = 'HEIGHT_DESC'
}

export interface ArweaveTransactionOwner {
    address?: string;
    key?: string;
}

export interface ArweaveTransactionAmount {
    winston?: string;
    ar?: string;
}

export interface ArweaveTransactionData {
    size?: string;
    type?: string;
}

export interface ArweaveTransactionTag {
    name?: string;
    value?: string;
}

export interface ArweaveTransactionBlock {
    id?: string;
    timestamp?: string;
    height?: string;
    previous?: string;
}

export interface ArweaveTransactionParent {
    id?: string;
}

export interface ArweaveTransactionNode {
    id?: string;
    anchor?: string;
    signature?: string;
    recipient?: string;
    owner?: ArweaveTransactionOwner;
    fee?: ArweaveTransactionAmount;
    quantity?: ArweaveTransactionAmount;
    data?: ArweaveTransactionData;
    tags?: ArweaveTransactionTag[];
    block?: ArweaveTransactionBlock;
    parent?: ArweaveTransactionParent;
}

export interface ArweaveTransactionEdge {
    cursor?: string;
    node?: ArweaveTransactionNode;
}

export interface ArweaveTransactionConnection {
    edges?: ArweaveTransactionEdge[];
}

export interface ArweaveGQLQuery {
    query: string;
}

export interface ArweaveGQLFilter {
    [key: string]: any;
}

export interface ArweaveGQLOptions {
    first?: number;
    after?: string;
    sort?: ArweaveGQLSortOrder;
}

// Field selection types
export interface OwnerFields {
    address?: boolean;
    key?: boolean;
}

export interface AmountFields {
    winston?: boolean;
    ar?: boolean;
}

export interface DataFields {
    size?: boolean;
    type?: boolean;
}

export interface TagFields {
    name?: boolean;
    value?: boolean;
}

export interface BlockFields {
    id?: boolean;
    timestamp?: boolean;
    height?: boolean;
    previous?: boolean;
}

export interface ParentFields {
    id?: boolean;
}

export interface NodeFields {
    id?: boolean;
    anchor?: boolean;
    signature?: boolean;
    recipient?: boolean;
    owner?: OwnerFields;
    fee?: AmountFields;
    quantity?: AmountFields;
    data?: DataFields;
    tags?: TagFields;
    block?: BlockFields;
    parent?: ParentFields;
    [key: string]: boolean | undefined | OwnerFields | AmountFields | DataFields | TagFields | BlockFields | ParentFields;
}
