export const checkIfColumnOrCard = (columns, id) =>{
    if(!id) return null;
    const columnIndex = columns.findIndex((col)=> col._id === id);
    if(columnIndex !== -1){
        return {data: columns[columnIndex], columnIndex : columnIndex, which : 'column'}
    }else{
        for(let i = 0; i < columns.length; i++){
            const result = columns[i].cards.findIndex((card)=> card._id === id)
            if(result !== -1){
                return {data : columns[i].cards[result], columnIndex : i, cardIndex: result, which : 'card'};
            };
        };
    }

    return null;
};

export const moveCard = (columns, activeInfo, overInfo) =>{
    const updatedColumns = [...columns];
    const sourceColumn = {...updatedColumns[activeInfo.columnIndex]};
    const movedCard = sourceColumn.cards[activeInfo.cardIndex];
    sourceColumn.cards = sourceColumn.cards.filter((_, index)=> index !== activeInfo.cardIndex);
    updatedColumns[activeInfo.columnIndex] = sourceColumn;

    const destinationColumn = {...updatedColumns[overInfo.columnIndex]};
    destinationColumn.cards = [...destinationColumn.cards, movedCard];
    updatedColumns[overInfo.columnIndex] = destinationColumn;
    return {updatedColumns, sourceColumn, destinationColumn};
};