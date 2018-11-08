USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_SelectAll_Paged]    Script Date: 11/8/2018 9:11:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[WorkshopsEvents_SelectAll_Paged]

@PageIndex int,
@PageSize int

AS

/*
EXEC WorkshopsEvents_SelectAll_Paged @PageIndex = 0, @PageSize = 5
*/

SELECT [Id]
      ,[Title]
      ,[Host]
      ,[Description]
      ,[AddressId]
      ,[StartTime]
      ,[EndTime]
      ,[Url]
      ,[ImageUrl]
      ,[IsRegistered]
	  ,[DateCreated]
	  ,[DateModified]
	  ,COUNT(*) OVER() AS TotalCount
  FROM [dbo].[WorkshopsEvents]
  ORDER BY Id
  OFFSET (@PageIndex * @PageSize) ROWS FETCH NEXT @PageSize ROWS ONLY
