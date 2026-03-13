#include<stdio.h>
#include<stdlib.h>
#include<fcntl.h>

int main()
{
    int fd = 0;

    fd = open("./hello.txt", O_RDONLY | O_CREAT, 0777);
    if(fd < 0)
    {
        printf("Unable to open the file\n");
    }

    printf("File opened successfully with fd: %d\n", fd);

    return 0;
}