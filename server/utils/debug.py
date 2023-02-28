def generate_prompt_debug(code, error):
    prompt = """Suggest Solution and For Example with repaired.
Example: 
Code language: Python 
Code: def test_function(p1, p2, p3): 
    result = p1 + p2 / p3 
    return result 
Error message: TypeError: unsupported operand type(s) for /: ‘str’ and ‘int’ Solution: Convert p2 to int before dividing by p3. 
Solution: Convert p2 to int before dividing by p3.
For example:
def test_function(p1, p2, p3): 
    result = p1 + int(p2) / p3 
    return result

Example: 
Code language: Swift 
Code: let x = 10 
let y = “5” 
let z = x + y 
print(z) 
Error message: No error message
Solution: Convert y to Int before adding to x. 
For example:
let x = 10 
let y = “5” 
let z = x + Int(y)! print(z)

Example: 
Code language: C 
Code: int x = 10; 
char y = ‘5’; 
int z = x + y; 
printf(“%d\n”, z); 
Error message: No error message but unexpected output of 63 instead of 15. 
Solution: Subtract the ASCII value of ‘0’ from y before adding to x. 
For example:
int x = 10; 
char y = ‘5’; 
int z = x + (y - ‘0’); 
printf(“%d\n”, z);

Generated prompt:
Code: {code}
Error message: {error}
""".format(code = code.capitalize(), error = error.capitalize())
    return prompt
