import { useState } from "react";
import "./App.css";

function App() {
    const [items, setItems] = useState<string[]>([
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5",
    ]);

    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const handleDragStart = (item: string) => {
        setDraggedItem(item);
    };

    const handleDrop = (targetItem: string) => {
        if (draggedItem === null) return;

        const draggedIndex = items.indexOf(draggedItem);
        const targetIndex = items.indexOf(targetItem);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            const newItems = [...items];
            [newItems[draggedIndex], newItems[targetIndex]] = [
                newItems[targetIndex],
                newItems[draggedIndex],
            ];
            setItems(newItems);
        }

        setDraggedItem(null); // Reset dragged item
    };

    const displayItems = () => {
        return items.map((item) => (
            <li
                key={item}
                onDragStart={() => handleDragStart(item)}
                onDrop={() => handleDrop(item)}
                onDragOver={(e) => e.preventDefault()} // Necessary to allow drop event
                draggable
            >
                {item}
            </li>
        ));
    };

    return (
        <>
            <h1>Drag and Drop in React</h1>
            <div className="container">
                <ul>{displayItems()}</ul>
            </div>
        </>
    );
}

export default App;
