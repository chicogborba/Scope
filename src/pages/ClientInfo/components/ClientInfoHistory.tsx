import React from "react";

export type HistoryFeedback = {
  feedback: string;
  date: string;
}

export interface ClientInfoHistoryProps {
  history: HistoryFeedback[];
}

const ClientInfoHistory: React.FC<ClientInfoHistoryProps> = ({
  history
}) => {

  return (
    <>
        <h2 className="text-2xl font-bold ">Histórico</h2>
        <div className="flex flex-col mt-8">
          <div className="flex justify-between mx-16 py-4">
            <div className="font-semibold">
              Feedback
            </div>
            <div className="font-semibold">
              Data da viajem
            </div>
          </div>
          {history.map((item, index) => (
            <div key={index} className="border-gray-400 py-4 border-t flex justify-between ">
              <div className="font-normal ml-16">
                {item.feedback}
              </div>
              <div className="font-normal mr-16">
                {item.date}
              </div>
              </div>
              ))}
        </div>
    </>
  );
} 

export default ClientInfoHistory;