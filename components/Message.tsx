//
//
//

import { format, formatDistanceToNow } from "date-fns";

export default function Message({ message_OBJ }) {
  console.log(message_OBJ);

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message_OBJ.property.name}
      </h2>
      <p>{message_OBJ.message}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message_OBJ.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message_OBJ.email}`} className="text-blue-500">
            {message_OBJ.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message_OBJ.phone}`} className="text-blue-500">
            {message_OBJ.phone}
          </a>
        </li>
        {GET_date(new Date(message_OBJ.createdAt))}
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
        Mark As Read
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">Delete</button>
    </div>
  );
}

function GET_date(date: Date) {
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  const formattedDate = format(date, "d. MMMM, yyyy"); // e.g., "2. June, 2024"

  return (
    <li>
      <strong>Received:</strong> {relativeTime} ({formattedDate})
    </li>
  );
}
