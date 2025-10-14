from typing import List, Optional


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(0,len(nums)):
           for j in range(i+1,len(nums)):
            print (nums[i] + nums[j])
    
    def addTwoNumbers(self, l1:list[int], l2: List[int]) -> None:
        val1,val2 =0,0
        for i in range(len(l1)-1,-1,-1):
            temp = int(l1[i]*10/100*10)
            val1 = str(val1) + str(temp)

        for i in range(len(l2)-1,-1,-1):
            temp = int(l2[i]*10/100*10)
            val2 = str(val2) + str(temp)
        print(val1)
        print(val2)
        print('------------------------')
        res = str(int(val1) + int(val2))
        print(res[::-1])



s = Solution()
result = s.addTwoNumbers([0],[0])
print(result)