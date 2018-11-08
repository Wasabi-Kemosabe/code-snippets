USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Select_ByInstance]    Script Date: 11/8/2018 9:23:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyAnswers_Select_ByInstance]

@InstanceId int

AS

/*
EXEC SurveyAnswers_Select_ByInstance @InstanceId=112
*/

SELECT	QuestionId,
		Question, 
		SA.Id as AnswerId,
		SA.AnswerOptionId,
		Answer,
		AnswerInt,
		SA.UserId, 
		InstanceId, 
		SurveyTemplateId,
		SQ.SectionId,
		SS.SortOrder AS SurveySectionSortOrder,
		SQ.SortOrder AS SurveyQuestionSortOrder,
		SS.Title AS SurveySectionTitle,
		SS.Description AS SurveySectionDesc,
		Survey.Name, 
		Survey.Description,
		SI.DateCreated
		

FROM SurveyAnswers AS SA
INNER JOIN SurveyQuestions AS SQ
	ON SA.QuestionId = SQ.Id
INNER JOIN SurveyInstance AS SI
	ON SA.InstanceId = SI.Id
INNER JOIN Survey
	ON SI.SurveyTemplateId = Survey.Id
INNER JOIN SurveySections AS SS
	ON SQ.SectionId = SS.Id
WHERE @InstanceId = InstanceId
