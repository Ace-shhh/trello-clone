import './Board.css';
import { useBoardContext } from '../context/BoardContext';
import { useColumnContext } from '../context/ColumnContext';
import { fetchBoardById } from '../api/boardApi';
import {useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DragAndDropProvider from '../components/DragAndDrop/DragAndDropProvider';
import AddColumn from '../components/Columns/AddColumn';
import Column from '../components/Columns/Column';

const Board = () =>{
    const { boardId } = useParams();
    const { boardInfo, setBoardInfo } = useBoardContext();
    const { columns, setColumns} = useColumnContext();

    useEffect(()=>{
        const fetchBoardData = async() =>{
            try{
                const fetchedBoard = await fetchBoardById(boardId);
                if(fetchedBoard){
                    setColumns(fetchedBoard.columns)
                    setBoardInfo(fetchedBoard);
                }
            }catch (error){
                console.error('Failed to fetch board data:', error)
            }
        }
        if(boardId){
            fetchBoardData();
        }
    }, [boardId])
    
    if (!boardInfo) {
      return <div>Loading...</div>;
    }

    return(
        <div className='board-page'>
            <div className='board-info-container'>
            {boardInfo.title}
            </div>
            <div className='columns-container'>
                <DragAndDropProvider boardId={boardId} items={columns?.map((col)=> col._id)}>
                    {columns?.map((col)=>(
                        <Column key={col._id} columnInfo={col}/>
                    ))}
                </DragAndDropProvider>
                <AddColumn boardId={boardId}/>
            </div>
        </div>
    )
}

export default Board;