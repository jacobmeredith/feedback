import { Button, Card } from '@feedback/design-system';
import * as React from 'react';
import {IFeedbackSurvey} from '@feedback/common';

interface IFeedbackCardProps {
  survey: IFeedbackSurvey;
  onClick: (type: 'create'|'update'|'delete'|null) => void;
}

function FeedbackCard({survey, onClick}: IFeedbackCardProps) {
  return (
    <div className="mb-4" key={survey.type}>
      <Card>
        <div className="flex items-center">
          <div>
            <h3 className="text-lg">{survey.feedbackTitle}</h3>
            <p className="mt-2">
              URL: <a className="text-purple-700 hover:underline" href={survey.feedbackUrl}>{survey.feedbackUrl}</a>
            </p>
          </div>
          <div className="flex flex-col items-center ml-auto">
            <Button type="outline" onClick={() => onClick('update')}>Update</Button>
            <div className="mt-2">
              <Button type="danger" onClick={() => onClick('delete')}>Delete</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export {FeedbackCard};
