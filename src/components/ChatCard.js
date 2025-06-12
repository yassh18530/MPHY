const ChatCard = ({ role, content, title, thumbnail }) => {
  // Function to format assistant message content
  const formatMessage = (text) => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {
        if (/^\d+\./.test(line)) {
          // Numbered list (e.g., 1. Step one)
          return <li key={index} className="ml-6 list-decimal">{line}</li>;
        } else if (/^[-*]/.test(line)) {
          // Bullet point (e.g., - Point here)
          return <li key={index} className="ml-6 list-disc">{line.slice(1).trim()}</li>;
        } else {
          return <p key={index} className="mb-2">{line}</p>;
        }
      });
  };

  return (
    <div
      className={`p-3 rounded-lg max-w-3xl ${
        role === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {role === "video" ? (
        <div className="flex flex-col">
          <a href={content} target="_blank" rel="noopener noreferrer">
            <img
              src={thumbnail}
              alt={title}
              className="rounded-md mb-2 w-full max-w-sm"
            />
            <p className="text-sm text-blue-700">{title}</p>
          </a>
        </div>
      ) : role === "assistant" ? (
        <div>{formatMessage(content)}</div>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default ChatCard;
