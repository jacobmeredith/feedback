import * as React from 'react';

import { Button, Card } from '@feedback/design-system';

import {IFeedbackSurvey} from '@feedback/common';
import { LinkIcon } from '@heroicons/react/outline';

interface IFeedbackCardProps {
  survey: IFeedbackSurvey;
  onClick: (type: 'create'|'update'|'delete'|null) => void;
}

function FeedbackCard({survey, onClick}: IFeedbackCardProps) {
  return (
    <div className="w-1/3 px-3 pb-6" key={survey.surveyId}>
      <Card className="bg-white border border-solid border-gray-200">
        <h3 className="text-2xl">{survey.name}</h3>
        <p className="mt-3 flex items-center">
          <LinkIcon className="w-4 h-4 mr-1" />
          <span className="mr-2">URL:</span>
          <a className="text-purple-700 hover:underline" target="_blank" href={survey.url} rel="noreferrer">{survey.url}</a>
        </p>
        <div className="flex flex-row mt-8">
          <Button variant="outline" onClick={() => onClick('update')}>Update</Button>
          <div className="ml-2">
            <Button variant="danger" onClick={() => onClick('delete')}>Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export {FeedbackCard};
