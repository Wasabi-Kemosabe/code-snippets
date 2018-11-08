USE [C60_LaPathways]
GO
/****** Object:  StoredProcedure [dbo].[UserProfileInfos_DemographicInfo]    Script Date: 11/8/2018 9:14:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[UserProfileInfos_DemographicInfo]

as

/*
exec UserProfileInfos_DemographicInfo
*/

begin

	select YearsInBusiness, count(*) as NumberOfPeople
	from UserProfileInfos
	group by YearsInBusiness

	select RaceEthnicityId = RaceEthnicity.TypeName, count(*) as NumberOfPeople
	from UserProfileInfos
	inner join RaceEthnicity
	on RaceEthnicityId = RaceEthnicity.Id
	group by RaceEthnicity.TypeName

	select LevelOfEducationId = LevelEducation.TypeName, count(*) as NumberOfPeople
	from UserProfileInfos
	inner join LevelEducation
	on LevelOfEducationId = LevelEducation.Id
	group by LevelEducation.TypeName

	select HouseholdIncome, count(*) as NumberOfPeople
	from UserProfileInfos
	group by HouseholdIncome

	select YearsInBusiness, avg(HouseholdIncome) as AvgHouseholdIncome
	from UserProfileInfos
	group by YearsInBusiness

	select LevelOfEducationId, avg(HouseholdIncome) as AvgHouseholdIncome
	from UserProfileInfos
	group by LevelOfEducationId

	select LevelOfEducationId = LevelEducation.TypeName, avg(YearsInBusiness) as AvgYearsInBusiness
	from UserProfileInfos
	inner join LevelEducation
	on LevelOfEducationId = LevelEducation.Id
	group by LevelEducation.TypeName

	select avg(YearsInBusiness) as AvgYearsInBusiness
	from UserProfileInfos

	select format(avg(HouseholdIncome), '###,###,###') as AvgHouseholdIncome
	from UserProfileInfos

	select sum(TotalPeople) as TotalPeople
	from (
		select count(*) TotalPeople from UsersMentors
		union all
		select count(*) TotalPeople from UsersCoaches
	) s

	select count(*) as TotalUsers
	from UserProfileInfos
	
	select (case when HouseholdIncome <= 15000 then 'range1'
             when HouseholdIncome > 15001 and HouseholdIncome <= 30000 then 'range2'
             when HouseholdIncome > 30001 and HouseholdIncome <= 45000 then 'range3'
             else 'range4'
        end) as range, count(*) as NumberOfPeople
    from UserProfileInfos
    group by (case when HouseholdIncome <= 15000 then 'range1'
               when HouseholdIncome > 15001 and HouseholdIncome <= 30000 then 'range2'
               when HouseholdIncome > 30001 and HouseholdIncome <= 45000 then 'range3'
               else 'range4'
        end);

end
