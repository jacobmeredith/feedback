import * as React from 'react';

import { Button, Card } from '@feedback/design-system';
import { LightBulbIcon, LinkIcon } from '@heroicons/react/outline';

import {IFeedbackSurvey} from '@feedback/common';

interface IFeedbackCardProps {
  survey: IFeedbackSurvey;
  onClick: (type: 'create'|'update'|'delete'|null) => void;
}

function FeedbackCard({survey, onClick}: IFeedbackCardProps) {
  return (
    <div className="mb-4" key={survey.type}>
      <Card className="bg-white border border-solid border-gray-200">
        <div className="md:flex md:flex-row md:items-center">
          <div>
            <h3 className="flex items-center">
              <LightBulbIcon className="w-6 h-6 mr-1" />
              <span className="md:text-lg">{survey.feedbackTitle}</span>
            </h3>
            <p className="mt-2 flex items-center">
              <LinkIcon className="w-4 h-4 mr-1" />
              <span className="mr-2">URL:</span>
              <a className="text-purple-700 hover:underline" href={survey.feedbackUrl}>{survey.feedbackUrl}</a>
            </p>
          </div>
          <div className="flex flex-row items-center mt-3 md:flex-col md:ml-auto md:mt-0">
            <Button type="outline" onClick={() => onClick('update')}>Update</Button>
            <div className="md:mt-2 md:ml-0 ml-2">
              <Button type="danger" onClick={() => onClick('delete')}>Delete</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export {FeedbackCard};
