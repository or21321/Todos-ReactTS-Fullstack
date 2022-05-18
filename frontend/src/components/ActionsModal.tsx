export default function ActionsModal({ toggle, onRemoveTodo, onEditTodo }: { toggle: () => void, onRemoveTodo: () => void, onEditTodo: () => void }) {

    return (
        <section
            className="menu-popup"
        >
            <div>
                <button
                    onClick={(ev) => { ev.stopPropagation(); toggle() }}
                    className="popup-close-btn"
                >X</button>
                <header>
                    Actions
                </header>
                <main>
                    <ul>
                        <button onClick={(ev) => { ev.stopPropagation(); onEditTodo() }}>Edit</button>
                        <button onClick={(ev) => { ev.stopPropagation(); onRemoveTodo() }}>Remove</button>
                    </ul>
                </main>
            </div >
        </section >
    )
}