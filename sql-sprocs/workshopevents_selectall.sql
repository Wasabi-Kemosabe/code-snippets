USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[WorkshopsEvents_SelectAll]    Script Date: 11/8/2018 9:10:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[WorkshopsEvents_SelectAll]

AS

/*
exec WorkshopsEvents_SelectAll
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
  FROM [dbo].[WorkshopsEvents]
